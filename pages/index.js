import Layout from "@/components/layout/Layout";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";

const DummyMeetups = [
    {
      id: "m1",
      title: "First Meetup",
      image: "https://images.pexels.com/photos/25677021/pexels-photo-25677021/free-photo-of-village-in-green-valley.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2s",
      address: "Some address 5,343,2 some city",
      description: "This is the first meetup. It will be an exciting event!",
    },
    {
      id: "m2",
      title: "Second Meetup",
      image: "https://picsum.photos/id/1025/200/300",
      address: "Another address, some city",
      description: "This is the second meetup. Don't miss it!",
    },
    {
      id: "m3",
      title: "Third Meetup",
      image: "https://picsum.photos/id/1035/200/300",
      address: "One more address, some city",
      description: "This is the third meetup. Join us for a great time!",
    },
    {
      id: "m4",
      title: "Fourth Meetup",
      image: "https://picsum.photos/id/1043/200/300",
      address: "Fourth address, some city",
      description: "This is the fourth meetup. It will be awesome!",
    },
    {
      id: "m5",
      title: "Fifth Meetup",
      image: "https://picsum.photos/id/1050/200/300",
      address: "Fifth address, some city",
      description: "This is the fifth meetup. See you there!",
    },
  ];
  

const HomePage = (props)=>{
    return(
            <MeetupList meetups={props.meetups}/>
    )

}
export async function getStaticProps(){
    const client = await MongoClient.connect(`mongodb+srv://siddhantaswal7:pingpongxyz@cluster0.mbqo9op.mongodb.net/meetups`);
    const db = client.db();

    const meetupsCollections = db.collection('meetups');
    const meetups = await meetupsCollections.find().toArray;
    client.close();
    return {
        props:{
            meetups: meetups.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()

            }))
        },
        revalidate:10
    }
}

export default HomePage;