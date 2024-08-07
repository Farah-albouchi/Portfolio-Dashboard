"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DrawerMenu from "../../app/components/drawer";
import Box from "@mui/material/Box";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ContactMe from "@/app/components/ContactMe";
import FooterPart from "@/app/components/footer";
import { ContactgetApi   , ContactUpdateApi} from "@/app/api/contactApi";
import { userContext  } from "../../app/Context/userContext";
import { Files } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Contact() {
  const [error, setError] = useState({});
  const { user, setUser } = useContext(userContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fb, setFB] = useState("");
  const [insta, setInsta] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [address, setAddress] = useState("");
  const [showDialog, setShowDialog] = useState(false);


  const [save, setSave] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      console.log(user?._id);

      try {
        const token = localStorage.getItem('token');
        const rep = await ContactgetApi(token);
        setData(rep); 
        if (rep) {
        console.log(rep);
        setFirstName(rep?.Firstname);
         setLastName(rep?.Lastname);
          setAddress(rep?.address);
          setEmail(rep?.email);
          setPhone(rep?.phone);
          setFB(rep?.
            FBlink);
          setInsta(rep?.INSTAlink);
          setLinkedin(rep?.
            LinkedIN
            );
          setWorkingHours(rep?.workingHoures);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user]);



  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("fb", fb);
    formData.append("insta", insta);
    formData.append("linkedin", linkedin);
    formData.append("workingHours", workingHours);
    formData.append("address", address);

    const token = localStorage.getItem('token');
    const rep = await ContactUpdateApi(token, formData);
    if (!rep.message) {
      setShowDialog(true);
      setSave(true);
    } else {
      setError({ message: rep });
    }

  };
 const fields = {phone , email , workingHours , address } 
 const links = {fb,insta,linkedin}
  return (
    <section className="w-full">
      <Box sx={{ display: "flex" }}>
        <DrawerMenu />
        <div className="flex sm:flex-row flex-col m-10">
          <div className="mt-10">
            <h1 className="font-bold text-3xl text-customBlue2 mb-8">
             Contact
            </h1>
            <ResizablePanelGroup
              direction="horizontal"
              style={{ height: "100%" }}
            >
              <ResizablePanel defaultSize={30}>
                <form onSubmit={onSubmit} className="mx-5 space-y-4">
                  <div className="flex flex-row space-x-16">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="Phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fb">Facebook</Label>
                    <Input
                      id="fb"
                      type="text"
                      placeholder="Facebook"
                      value={fb}
                      onChange={(e) => setFB(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insta">Instagram</Label>
                    <Input
                      id="insta"
                      type="text"
                      placeholder="Instagram"
                      value={insta}
                      onChange={(e) => setInsta(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="text"
                      placeholder="LinkedIn"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workingHours">Working Hours</Label>
                    <Input
                      id="workingHours"
                      type="text"
                      placeholder="Working Hours"
                      value={workingHours}
                      onChange={(e) => setWorkingHours(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                
                  <Button type="submit"  className ="bg-customBlue2 float-end">
                    Save
                  </Button>
                </form>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel maxSize={60} defaultSize={60}>
                <ContactMe data={fields} />
                <FooterPart data={links} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Information Updated</AlertDialogTitle>
            <AlertDialogDescription>
              Your personal information has been successfully updated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </Box>
    </section>
  );
}
