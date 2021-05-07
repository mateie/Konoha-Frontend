import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { getBot } from '../../actions/bot';
import { Container, Segment, Header, Image, Dropdown } from 'semantic-ui-react';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getBot();
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { user } = this.props.auth.user;

        const userAvatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        const triggerUserDropdown = (
            <span>
                <Image src={userAvatarURL} avatar /> {user.username}
            </span>
        );

        const userOptions = [
            {
                key: 'user', text: (
                    <span>
                        Signed in as <strong>{user.username}</strong>#<strong>{user.discriminator}</strong>
                    </span>
                ),
                disabled: true,
            },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: this.onLogoutClick },
        ];

        return (
            <Container fluid>
                <Header as="h2" size="small">
                    <Segment floated="left" onClick={() => this.setState({ visibleSidebar: !this.state.visibleSidebar })}>

                    </Segment>
                    <Segment size="large" floated="right">
                        <Dropdown
                            trigger={triggerUserDropdown}
                            options={userOptions}
                            pointing='top right'
                            icon={null}
                        />
                    </Segment>
                </Header>
            </Container>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getBot: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    bot: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    bot: state.bot,
});

export default connect(
    mapStateToProps,
    { logoutUser, getBot }
)(Dashboard);