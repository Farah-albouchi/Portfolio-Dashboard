
import { Button } from "@/components/ui/button"
import DrawerMenu from "../app/components/drawer";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import {MessagegetApi,MessagesDeleteApi} from "@/app/api/notificationApi";
import { parseISO, format } from 'date-fns';
import { userContext  } from "../app/Context/userContext";
export default function Component() {
  const [name , setName] = useState("")
  const [object,setObject] = useState("");
  const [details,setDetails]=useState("");
  const [date,setDate]=useState(null);
  const [email,setEmail]=useState("")
  const [data,setData]=useState();
  const { user, setUser } = useContext(userContext);
  const [messages , setMessages] = useState([])

  function formatDateString(isoDateString) {
    const date = parseISO(isoDateString);
    return format(date, 'MMM dd, yyyy h:mm a');
  }


  useEffect(() => {
    const fetchData = async () => {
      console.log(user?._id);

      try {
        const token = localStorage.getItem('token');
        const rep = await MessagegetApi(token);
        setData(rep); 
        if (rep) {
        console.log(rep);
        setMessages(rep);
        console.log(messages);
        // setName(rep.name);
        // setObject(rep.object);
        // setDetails(rep.Text);
        // setEmail(rep.email);
        // setDate(formatDateString(rep.date));

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user?._id]);

  const handleDeleteTMessages = async (id, index) => {
    try {
      const token = localStorage.getItem("token");
      await MessagesDeleteApi(token, id);
      const updatedmessages = messages.filter((_, i) => i !== index);
      setMessages(updatedmessages);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };


  return (
    <section className="w-full ">
    <Box sx={{ display: "flex" }}>
      <DrawerMenu />
    <div className="w-full" >
      <section className="w-full flex  justify-center items-center">
        <img
          src="assets/Mail.svg"
          width="500"
          height="200"
          alt="Hero"
          className=" object-cover object-center"
          style={{  objectFit: "cover" }}
        />
      </section>
      <section className="container py-12 md:py-16">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Messages</h2>
            <p className="text-muted-foreground">View and manage your messages.</p>
          </div>
          <div className="space-y-4">
            { messages && messages.length>0 ? (
              messages.map((message, index) => (
            <div className="group flex items-start gap-4 rounded-lg border p-4 hover:bg-muted">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex flex-row space-x-4">
                  <p className="font-medium">{message.Name} :</p>
                  <p className="font-medium text-customblue">{message.email}</p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">{formatDateString(message.date)}</p>
                </div>
                <p className="text-sm font-medium">{message.object}</p>
                <p className="text-sm text-muted-foreground">
                 {message.Text}
                </p>
              </div>
              <Button  onClick={() =>
                                  handleDeleteTMessages(message._id, index)
                                } variant="destructive" className="shrink-0 text-white border-red hover:text-white hover:bg-red">
                Delete
              </Button>
              
            </div>))) :
            (<p>No messages found.</p>) }
            </div>
        </div>
      </section>
    </div>
    </Box>
    </section>
  )
}