import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId} from "mongodb";
const MeetupDetailsPage = (props) => {
  return (
    <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      desciption={props.meetupData.desciption}
    />
  );
};
export async function getStaticPaths(){

    const client = await MongoClient.connect(`mongodb+srv://siddhantaswal7:pingpongxyz@cluster0.mbqo9op.mongodb.net/meetups`);
    const db = client.db();

    const meetupsCollections = db.collection('meetups');
    const meetups = await meetupsCollections.find({},{_id:1}).toArray();
    client.close();
    return{
        fallback:false,
        paths: meetups.map(meetup=>({params:{meetupId:meetup._id.toString()}}))
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(`mongodb+srv://siddhantaswal7:pingpongxyz@cluster0.mbqo9op.mongodb.net/meetups`);
    const db = client.db();

    const meetupsCollections = db.collection('meetups');
    const selectedMeetup = await  meetupsCollections.findOne({
        _id:ObjectId(meetupId),
    });
    client.close();
    return{
        props:{
            meetupData: {
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                image:selectedMeetup.image,
                desciption:selectedMeetup.desciption
            }
        }
    }
}
export default MeetupDetailsPage;