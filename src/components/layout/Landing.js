import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { getBot } from '../../actions/bot';
import { Container, Image, Divider, Header, Button, Icon, Segment, Statistic } from 'semantic-ui-react';

class Landing extends Component {
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        this.props.getBot();
    }

    login = e => {
        e.preventDefault();

        this.props.loginUser();

    }

    contextRef = createRef();

    render() {
        const { bot } = this.props.bot;

        if(Object.keys(bot).length === 0) {
            console.log('Offline bot');
            return (
                <Container textAlign="center">
                    <Header as="h1" size="huge" color="red">Bot is Offline</Header>
                </Container>
            );
        } else {
            return (
                <Container textAlign="center">
                    <Segment style={{ border: 'none' }}>
                        <Header as="h1" icon textAlign="center" style={{ top: "50%" }}>
                            <Image circular src={bot.user.avatarURL} alt="" />
                            
                            <Header.Content>
                                {bot.user.username}
                            </Header.Content>
                            <Header.Subheader>
                                Owned by {bot.owners}
                            </Header.Subheader>
                            <Button color="green" onClick={this.login}>Log In</Button>
                        </Header>
                        <Divider horizontal />
                        <Statistic.Group color={bot.presence.statusColor} size="mini" widths={4}>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon circular name="terminal" />
                                    Bot Status
                                </Statistic.Value>
                                <Statistic.Label>
                                    {bot.presence.formattedStatus}
                                </Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon circular name="code" />
                                    Activity
                                </Statistic.Value>
                                <Statistic.Label>
                                    {bot.presence.activities[0].formattedType} {bot.presence.activities[0].name}
                                </Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon circular name="server" />
                                    Total Servers
                                </Statistic.Value>
                                <Statistic.Label>
                                    {bot.count.guilds}
                                </Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon circular name="users" />
                                    Total Users
                                </Statistic.Value>
                                <Statistic.Label>
                                    {bot.count.users}
                                </Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                    </Segment>
                    <Divider horizontal />
                </Container>
            );
        }
    }
};

Landing.propTypes = {
    loginUser: PropTypes.func.isRequired,
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
    { loginUser, getBot }
)(Landing);