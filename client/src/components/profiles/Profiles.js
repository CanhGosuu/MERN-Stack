import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';
export class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let ProfileItems;
    if (profiles === null || loading) {
      ProfileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        ProfileItems = profiles.map(pro => (
          <ProfileItem key={pro._id} profile={pro} />
        ));
      } else {
        ProfileItems = <h1>Profiles not fond...</h1>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {ProfileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = { getProfiles };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
