import React from 'react';
import Profile from "./Profile";
import axios from 'axios';
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType, setProfile} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router";


type OwnProps = {


}
type PatchParamsType = {
    userId: string
}
type OwnPropsType =  MapDispatchType & MapStateType
type PropsType = RouteComponentProps<PatchParamsType> & OwnPropsType

export class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) userId ='2';

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setProfile(response.data);
            });
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profilePage}/>
            </div>
        );
    }
}


export type MapStateType = {
    profilePage: ProfileType | null
}

type MapDispatchType = {
    setProfile: (obj: ProfileType) => void
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profilePage: state.profilePage.profile
    }
}


let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default  connect<MapStateType, MapDispatchType, OwnProps, AppStateType>(mapStateToProps, {setProfile})
(WithUrlDataContainerComponent);