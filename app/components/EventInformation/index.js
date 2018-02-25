/**
 *
 * EventInformation
 *
 */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import moment from 'moment';

import DateRangePickerWithGaps from '../DateRangePickerWithGaps';
import RaisedButton from '../../containers/AddEvent/RaisedButton';
import { SelectedSponsors } from '../../containers/AddEvent/SelectedSponsors';

import authenticate from '../../utils/Authenticate';

// styles
import './style.css';
import './styleM.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default class EventInformation extends PureComponent {
    state = {
        dateError: '',
        modalMessage: '',
        snackBar: false,
        // event
        name: '',
        url: '',
        days: '',
        description: '',
        selectedTag: '',
        selectedTags: [],
        selectedSponsors: [],
        day: '',
        start: '',
        dateMulti: [],
        end: '',
        startMulti: [],
        endMulti: [],
        newSponsors: [],
        // organizers
        organizers: [],
        showOrganizers: false,
        // sponsors
        sponsors: [],
        checkNewSponsors: '',
        // add new Sponsor form values
        sponsorNames: '',
        sponsorLogos: '',
        sponsorWebsites: '',
        // date/time
        // tags
        loadedTags: [],
        checkedRadio: null,
        logo: '',
        logoPreview: '',
        eventImg: '',
        eventImgPreview: '',
        tag: [],
        selectedOrganizers: [],
        eventSponsors: [],
        eventOrganizers: [],
        eventDates: [],
        changeDateMulti: [],
        changeStartMulti: [],
        changeEndMulti: [],
        // eventDescription: '',
        focusedInput: false,
        startDate: moment(),
        endDate: moment(),
        date: [],
    };

    async componentDidMount() {
        const authorized = await authenticate(localStorage['token']);
        if (!authorized.error && authorized) {
            this.getOrganizers();
            this.getSponsors();
            this.loadSkills();
            this.getEvent(this.props.id);
        } else {
            this.props.history.push('/');
        }
    }

    getEvent = eventID => {
        fetch(`http://localhost:8000/api/event/${eventID}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    event: json.event,
                    eventSponsors: json.sponsors,
                    eventOrganizers: json.organizers,
                    description: json.event.description,
                    url: json.event.url,
                    name: json.event.title,
                    eventDates: json.dates,
                    eventImgPreview: json.event.image,
                    selectedTags: json.tags
                }, () => {
                    this.previousSponsors();
                    this.previousOrganizers();
                    this.previousDates();
                });
            })
        };

        previousSponsors = () => {
            if (this.state.eventSponsors.length) {
                this.state.eventSponsors.forEach(sponsor => {
                    const selectedSponsors = this.state.selectedSponsors.slice();
                    selectedSponsors.push(sponsor.name);
                    this.setState({ selectedSponsors: selectedSponsors });
                })
            }
        };

        previousOrganizers = () => {
            if (this.state.eventOrganizers.length) {
                this.state.eventOrganizers.forEach(organizer => {
                    const selectedOrganizers = this.state.selectedOrganizers.slice();
                    selectedOrganizers.push(organizer.email);
                    this.setState({ selectedOrganizers: selectedOrganizers });
                })
            }
        }

        previousDates = () => {
            if (this.state.eventDates.length) {
                if (this.state.eventDates.length > 1 && !!!this.state.checkedRadio) {
                    this.setState({
                        checkedRadio: 1, 
                        days: this.state.eventDates.length,
                    });
                    this.state.eventDates.forEach((date, i) => {
                        let start = date.start.split(' ');
                        const [ startDateString, startTimeString ] = start; 
                        let day = moment(startDateString);
                        let startTimeSeconds = startTimeString.lastIndexOf(':');
                        let startTime = startTimeString.slice(0, startTimeSeconds);

                        let end = date.end.split(' ');
                        const [, endTimeString ] = end; 
                        let endTimeSeconds = endTimeString.lastIndexOf(':');
                        let endTime = endTimeString.slice(0, endTimeSeconds);

                        this.setState((prevState) => {
                            const dateMulti = prevState.dateMulti.slice();
                            dateMulti.push({ 
                                day: day,
                                start: startTime,
                                end: endTime,
                            });
                            return { dateMulti: dateMulti }    
                        });
                    });
                } else if (this.state.eventDates.length === 1 && !!!this.state.checkedRadio) {
                    this.setState({
                        checkedRadio: 0, 
                        // days: this.state.eventDates.length,
                    });
                    let [ date ] = this.state.eventDates.slice();


                    let start = date.start.split(' ');
                    const [ dateString, startTimeString ] = start; 
                    const day = moment(dateString);
                    const startTimeWithSeconds = startTimeString.lastIndexOf(':');
                    start = startTimeString.slice(0, startTimeWithSeconds);

                    let end = date.end.split(' ');
                    const [, endTimeString ] = end; 
                    const endTimeWithSeconds = endTimeString.lastIndexOf(':');
                    end = endTimeString.slice(0, endTimeWithSeconds);

                    date = [{
                        day,
                        start,
                        end
                    }]
                    this.setState(() => ({ date }));

                }
            }
        }

    getSponsors = () => {
        fetch(`http://localhost:8000/api/sponsors`, {
            headers: { Authorization: `Bearer ${localStorage['token']}` }
        })
            .then(response => response.json())
            .then(Sponsors => {
                if (!Sponsors.error)
                    this.setState({ sponsors: Sponsors });
            })
            .catch(error => {
                alert(`GetSponsors(): error in fetching data from server: ${error}`); // eslint-disable-line
            });
    }

    getOrganizers = () => {
        fetch(`http://localhost:8000/api/organizers/events`, {
            headers: { Authorization: `Bearer ${localStorage['token']}` }
        })
            .then(response => response.json())
            .then(Organizers => {
                if (!Organizers.error) {
                    this.setState({ organizers: Organizers });
                }
            })
            .catch(error => {
                alert(`getOrganizers(): error in fetching data from server: ${error} message: ${error.message}`); // eslint-disable-line
            });
    }

    loadSkills = () => {
        fetch('http://localhost:8000/api/skills/all', {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(response => response.json())
            .then(json => { this.setState({ loadedTags: json }) })
            .catch(error => {
                alert(`loadSkills(): error in fetching data from server: ${error}`);
            });
    }

    removeNewSponsor = (sponsor) => {
        if (sponsor) {
            const sponsors = this.state.newSponsors.slice();
            const remove = sponsors.findIndex(previous => previous === sponsor);
            if (remove !== -1) {
                sponsors.splice(remove, 1);
                this.setState({ newSponsors: sponsors });
            }
        }
    }

    eventName = event => this.setState({ name: event.target.value.replace(/\s\s+/g, ' ').trim() });
    eventUrl = event => this.setState({ url: event.target.value.trim() });
    eventDays = event => this.setState({ days: event.target.value });

    selectSponsor = (selectedSponsor) => this.setState({ selectedSponsors: selectedSponsor });
    selectOrganizer = (selectedOrganizer) => this.setState({ selectedOrganizers: selectedOrganizer });
    eventDescription = e => this.setState({ description: e.target.value });

    handleOrganizerChange = event => {
        this.setState({ selectedOrganizers: event.target.value });
    };

    handleSponsorChange = event => {
        this.setState({ selectedSponsors: event.target.value });
    };


    handleSkillTags = event => {
        this.setState({ selectedTags: event.target.value });
    };


    toggleNewSponsors = () => this.setState({ checkNewSponsors: !this.state.checkNewSponsors });

    toggleSnackBar = (message) =>
        this.setState({
            snackBar: !this.state.snackBar,
            snackBarMessage: message
        });

    handleRequestClose = () => { this.setState({ snackBar: false, snackBarMessage: "" }); };

    sponsorName = event => this.setState({ sponsorNames: event.target.value });
    sponsorUrl = event => this.setState({ sponsorWebsites: event.target.value });

    onNewSponsorSubmit = e => {
        e.preventDefault();
        let { sponsorNames, sponsorWebsites, logo } = this.state;
        if (logo && sponsorNames && sponsorWebsites) {
            const oldSponsors = this.state.sponsors.slice();
            const newSponsors = this.state.newSponsors.slice();
            const sponsor = {
                name: this.state.sponsorNames,
                website: this.state.sponsorWebsites,
                logo: this.state.logo,
                imagePreviewUrl: this.state.logoPreview,
            };
            const duplicateOld = oldSponsors.findIndex(previous => previous.label === sponsor.name);
            const duplicateNew = newSponsors.findIndex(previous => previous.name === sponsor.name);
            if (duplicateOld === -1 && duplicateNew === -1) {
                newSponsors.push(sponsor);
                this.setState({ newSponsors: newSponsors });
            } else {
                this.toggleSnackBar("Sponsor name already taken!");
            }
        }
    }

    Submit = () => {
        let {
            newSponsors,
            endMulti,
            startMulti,
            dateMulti,
            day,
            start,
            end,
            description,
        } = this.state;

        let data = new FormData();
        data.append('description', description);
        data.append('tags', this.state.selectedTags);
        data.append('compEvent', 0);
        data.append('name', this.state.name);
        data.append('image', this.state.eventImg);
        data.append('url', this.state.url);
        data.append('organizers', this.state.selectedOrganizers);
        data.append('sponsors', this.state.selectedSponsors);

        if (!!newSponsors.length) {
            data.append('newSponsors', JSON.stringify(newSponsors));
            newSponsors.forEach((file, index) => data.append(`logos${index}`, file.logo));
        }
        if (!!!dateMulti.length) {
            if (day) data.append('day', JSON.stringify(day));
            if (start) data.append('start', JSON.stringify(start));
            if (end) data.append('end', JSON.stringify(end));
        } else {
            const days = dateMulti.findIndex(previous => previous.day === '');
            const starts = startMulti.findIndex(previous => previous.start === '');
            const ends = endMulti.findIndex(previous => previous.end === '');
            if (days === -1 && starts === -1 && ends === -1) {
                data.append('dateMulti', JSON.stringify(dateMulti));
                data.append('startMulti', JSON.stringify(startMulti));
                data.append('endMulti', JSON.stringify(endMulti));
            }
        }

        fetch(`http://localhost:8000/api/event`, {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
            method: 'post',
            body: data,
        })
            .then(response => response.json())
            .then(eventID => {
                if (eventID.error) {
                   this.toggleSnackBar(eventID.error); 
                } else {
                    this.props.history.push(`/event/${eventID}`)
                }
            })
            .catch(error => {
                // console.log(error);
            })
    }

    closeModal = () => this.setState({ modalMessage: '' });

    renderLogoImage = () => {
        if (this.state.logo !== "")
            return <img alt="" src={this.state.logoPreview} className="spaceLogoImagePreview" />
    }

    renderLogoImageText = () => {
        if (this.state.logoPreview === "" || this.state.logoPreview === undefined || this.state.logoPreview === null) {
            return (
                <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    Select a Logo
                    <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 512 x 512</span>
                </span>
            )
        }
    }

    renderEventImage = () => {
        if (this.state.eventImg || this.state.eventImgPreview) {
            return (
                <img alt="" src={this.state.eventImgPreview} className="spaceLogoImagePreview" />
            )
        }
    }

    renderEventImageText = () => {
        if (!this.state.eventImgPreview) {
            return (
                <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    Add an Event Image
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 512 x 512</span>
                </span>
            )
        }
    }
    changeRadio = e => this.setState({
        checkedRadio: e.target.value,
        days: '',
        dateMulti: [],
        endMulti: [],
        startMulti: [],
        dateError: '',
        day: '',
        start: '',
        end: '',
        date: [],
    });

    handleLogo = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                logo: file,
                logoPreview: reader.result
            });
        }

        reader.readAsDataURL(file);
    };

    handleEventImage = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                eventImg: file,
                eventImgPreview: reader.result
            });
        }

        reader.readAsDataURL(file);
    };
    render() {
        const {
            snackBarMessage,
            dateError,
            snackBar,
            newSponsors, 
            organizers,
            sponsors,
            checkNewSponsors,
            loadedTags,
            days,
            dateMulti,
            date
        } = this.state;

        const options = [
            {
                id: 0,
                option: "one day event"
            },
            {
                id: 1, 
                option: "multi-day event"
            }
        ];
        return (
            <div className="container">
                <Helmet>
                    <title>Create Event Form</title>
                    <meta name="description" content="Description of Create event form" />
                </Helmet>

                <div className="addEventBanner">
                    <div className="homeHeaderContentTitle">Add a New Event</div>
                    <div className="homeHeaderContentSubtitle">Create an Event for your Space</div>
                </div>
                <main className="spaceSignUpMain">

                    <div className="spaceSignUpTitle">Submit an Event</div>
                    <div className="spaceSignUpContainer">

                        <TextField label="Event name" onChange={this.eventName} value={this.state.name} type="text" name="eventName" margin="normal" />
                        <TextField onChange={this.eventUrl} type="url" value={this.state.url} label="Event url" margin="normal" />
                        <TextField label="Brief description" value={this.state.description} margin="normal" multiline onChange={this.eventDescription} />

                        {!!loadedTags.length &&
                            <FormControl style={{ marginTop: 24 }}>
                                <InputLabel htmlFor="tags-select">Relevant Tags</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedTags}
                                    onChange={this.handleSkillTags}
                                    input={<Input id="tag-multiple" />}
                                    renderValue={selected => selected.join(',')}
                                    MenuProps={MenuProps}
                                >
                                    {loadedTags.map((tag, key) => (
                                        <MenuItem key={`${key}tag`} value={tag}>
                                            <Checkbox checked={(this.state.selectedTags.indexOf(tag) > -1)} />
                                            <ListItemText primary={tag} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        {!!organizers.length &&
                            <FormControl style={{ marginTop: 24 }}>
                                <InputLabel htmlFor="organizers-select">Organizers</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedOrganizers}
                                    onChange={this.handleOrganizerChange}
                                    input={<Input id="tag-multiple" />}
                                    renderValue={selected => selected.join(',')}
                                    MenuProps={MenuProps}
                                >
                                    {organizers.map(organizer => (
                                        <MenuItem key={organizer} value={organizer}>
                                            <Checkbox checked={this.state.selectedOrganizers.indexOf(organizer) > -1} />
                                            <ListItemText primary={organizer} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        {!!sponsors.length &&
                            <FormControl style={{ marginTop: 24 }}>
                                <InputLabel htmlFor="sponsors-select">Sponsors</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedSponsors}
                                    onChange={this.handleSponsorChange}
                                    input={<Input id="tag-multiple" />}
                                    renderValue={selected => selected.join(',')}
                                    MenuProps={MenuProps}
                                >
                                    {sponsors.map(sponsor => (
                                        <MenuItem key={sponsor} value={sponsor}>
                                            <Checkbox checked={this.state.selectedSponsors.indexOf(sponsor) > -1} />
                                            <ListItemText primary={sponsor} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        {dateError && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                        {/* {(timeError && !checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>} */}
                        {dateError && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                        {/* {(timeError && checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>} */}

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: 50,
                                color: 'rgba(0,0,0,0.54)',
                                justifyContent: 'space-between',
                                marginBottom: parseInt(this.state.checkedRadio, 10) === 1 ? 32 : '',
                                marginTop: 32
                            }}
                        >
                            {options.map((item, i) =>
                                <label key={`l${item.id}`} className="radio-inline">
                                    <input
                                        type="radio"
                                        checked={this.state.checkedRadio === i.toString()}
                                        ref={(el) => this["myRadioRef" + i] = el}
                                        value={item.id}
                                        onChange={this.changeRadio}
                                        onKeyDown={(event) => event.keyCode === 13 ? this.changeRadio(event) : null}
                                    />
                                    <span style={{ paddingLeft: 8 }}>{item.option}</span>
                                </label>
                            )}
                        </div>

                        {parseInt(this.state.checkedRadio, 10) === 1 &&
                            <TextField
                                label="How many days?"
                                onChange={this.eventDays}
                                value={this.state.days}
                                type="text"
                            />} 

                         {parseInt(this.state.checkedRadio, 10) === 0 && 
                            <React.Fragment>
                                <label key="singleDay" className="addEventFormLabel"> date & time </label>
                                <DateRangePickerWithGaps 
                                    dates={date}
                                    handleDate={foo => {
                                        this.setState(() => ({ date: foo })); 
                                    }}
                                />
                            </React.Fragment>
                        }

                         {(
                            parseInt(this.state.checkedRadio, 10) === 1 
                                && days 
                                && dateMulti.length === days
                            ) &&
                            <DateRangePickerWithGaps 
                                dates={dateMulti}
                                handleDate={dates => {
                                    this.setState(() => ({ dateMulti: dates })); 
                                }}
                            />
                        } 

                         {(
                            parseInt(this.state.checkedRadio, 10) === 1 
                                && days 
                                && dateMulti.length !== days
                            ) &&
                            <DateRangePickerWithGaps 
                                numberOfDates={days}
                                handleDate={dates => {
                                    this.setState(() => ({ dateMulti: dates })); 
                                }}
                            />
                        } 

                        <div style={{ display: 'flex', marginTop: '32px', marginBottom: '72px' }}>
                            <input
                                id="newSponsors"
                                type="checkbox"
                                onKeyDown={(e) => e.keyCode === 13 ? this.toggleNewSponsors() : null}
                                onChange={this.toggleNewSponsors}
                                checked={checkNewSponsors}
                            />

                            <label style={{ color: 'rgba(0,0,0,0.54)' }} htmlFor="newSponsors" >
                                &nbsp;&nbsp;Add new sponsor
                            </label>

                        </div>

                        {checkNewSponsors && [
                            <TextField
                                key="newSponTF1"
                                label="name"
                                onChange={this.sponsorName}
                                value={this.state.sponsorNames}
                                type="text"
                                margin="normal"
                            />,

                            <TextField
                                key="newSponTF2"
                                label="website"
                                onChange={this.sponsorUrl}
                                value={this.state.sponsorWebsites}
                                type="url"
                                margin="normal"
                            />,

                            <div key="newSponTF3" className="spaceLogoMainImageRow">
                                <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
                                    {this.renderLogoImageText()}
                                    {this.renderLogoImage()}
                                    <input
                                        type="file"
                                        onChange={this.handleLogo}
                                        id="logo-image"
                                        style={{ display: 'none' }}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </label>
                            </div>,

                            <RaisedButton
                                key="newSponTF4"
                                onSubmit={this.onNewSponsorSubmit}
                                sponsor
                                style={{
                                    backgroundColor: '#3399cc',
                                    marginBottom: 64,
                                    padding: '10px',
                                    marginTop: '15px',
                                    color: 'rgba(0,0,0,0.54)',
                                    fontWeight: 'bold'
                                }}
                            />
                        ]}

                        {!!newSponsors.length &&
                            <SelectedSponsors
                                selectedSponsors={newSponsors}
                                removeSponsor={this.removeNewSponsor}
                                newSponsor={true}
                            />}

                        <div className="spaceLogoMainImageRow">
                            <label htmlFor="event-image" className="spaceLogoMainImageBlock">
                                {this.renderEventImageText()}
                                {this.renderEventImage()}
                                <input
                                    type="file"
                                    onChange={this.handleEventImage}
                                    id="event-image"
                                    style={{ display: 'none' }}
                                    accept="image/png, image/jpg, image/jpeg"
                                />
                            </label>
                        </div>

                        <FlatButton style={{ backgroundColor: '#ff4d58', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }} onClick={this.Submit}>
                            Submit Event
                        </FlatButton>
                    </div>
                </main>
                <footer className="homeFooterContainer">
                    Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
                </footer>
                <Snackbar
                    open={snackBar}
                    message={snackBarMessage}
                    autoHideDuration={4000}
                    onClose={this.handleRequestClose}
                />
            </div>
        );
    }
}
 