import { useRouter } from "next/router";

const { default: NewMeetupForm } = require("@/components/meetups/NewMeetupForm")

const NewMeetupPage = ()=>{

    const router = useRouter();

    const addMeetupHandler = async (meetupData)=>{
        const response = await fetch(`/api/new-meetup`,{
            method:`POST`,
            body:JSON.stringify(meetupData),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/')
    }
    return(
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    )
}


export default NewMeetupPage;