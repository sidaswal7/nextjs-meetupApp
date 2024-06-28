import MeetupDetails from "../../components/meetups/MeetupDetails";

const MeetupDetailsPage = (props) => {
  return (
    <MeetupDetails
      meetupData={props.meetupData}
    />
  );
};
export async function getStaticPaths(){
    return{
        fallback:false,
        paths:[
            {params:{meetupId:'m1'}},
            {params:{meetupId:'m2'}},
            {params:{meetupId:'m3'}}

        ]
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    return{
        props:{
            meetupData:{
                img:"https://picsum.photos/id/1050/200/300",
                id:meetupId,
                title:"A first meetup",
                address:"some street 345 new Coast",
                description:"the Meetup Description"
            }
        }
    }
}
export default MeetupDetailsPage;