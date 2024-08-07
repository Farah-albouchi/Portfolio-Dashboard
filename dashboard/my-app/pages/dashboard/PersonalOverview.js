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
import HomePart from "@/app/components/HomePage";
import { OverviewApi, UpdateNameApi, UpdateOverviewApi , UsergetApi } from "@/app/api/PersonalOverviewApi";
import { userContext } from "../../app/Context/userContext";
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

export default function Personal() {
  const [error, setError] = useState("");
  const { user, setUser } = useContext(userContext);
  const [FirstName, setFirstName] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Job, setJob] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState(null);
  const [CV, setCV] = useState();
  const [save, setSave] = useState(false);
  const [data, setData] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await UsergetApi(token);
        setFirstName(response.Firstname);
        setLastname(response.Lastname);
        const rep = await OverviewApi(token);
        setData(rep);
        if (rep) {
          setJob(rep?.job);
          setdescription(rep?.description);
          setImage(rep?.image);
          setCV(rep?.CV);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?._id, save]);

  const handleCVChange = (e) => {
    setCV(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("job", Job);
    if (image && image !== data.image) {
      formData.append("image", image);
    }
    if (CV && CV !== data.CV) {
      formData.append("CV", CV);
    }
    const token = localStorage.getItem('token');
    const rep = await UpdateOverviewApi(token, formData);
    if (rep.message === "success") {
 
      setShowDialog(true);
      setSave(!save);
      
      
    } else {
      setError(rep);
    }
    const data2 = { Firstname: FirstName, Lastname: Lastname };
    const rep2 = await UpdateNameApi(token, data2);
    if (rep2.message === "success") {
      setShowDialog(true);
 
      setSave(!save);
      
      
    } else {
      setError(rep2);
    }
  };

  const fields = { Job, description, FirstName, Lastname, CV, image };

  return (
    <section className="w-full">
      <Box sx={{ display: "flex" }}>
        <DrawerMenu />
        <div className="flex sm:flex-row flex-col m-10">
          <div className=" mt-10">
            <h1 className="font-bold text-3xl text-customBlue2 mb-8">
              Personal Overview{" "}
            </h1>
            <ResizablePanelGroup
              direction="horizontal"
              style={{ height: "100%" }}
            >
              <ResizablePanel defaultSize={30}>
                <form onSubmit={onSubmit} className=" mx-5 space-y-4">
                  <div className="flex flex-row space-x-16">
                    <div className="space-y-2">
                      <Label htmlFor="Firstname">First Name</Label>
                      <Input
                        id="Firstname"
                        type="text"
                        placeholder="First Name"
                        required
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="Lastname">Last Name</Label>
                      <Input
                        id="Lastname"
                        type="text"
                        placeholder="Last Name"
                        value={Lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Job">Job</Label>
                    <Input
                      id="Job"
                      type="text"
                      placeholder="Job"
                      value={Job}
                      onChange={(e) => setJob(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="description"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      className="h-24"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <input
                      id="picture"
                      type="file"
                      onChange={handleImageChange}
                    />
                    {image && (
                      <div>
                        <img src={image} alt="Current" width="100" />
                      </div>
                    )}
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label className="font-normal" htmlFor="CV">
                      CV
                    </label>
                    <input id="CV" type="file" onChange={handleCVChange} />
                    {CV && (
                      <div>
                        <a href={CV} target="_blank" rel="noopener noreferrer">
                          <p className="text-zinc-600">View Current CV</p>
                        </a>
                      </div>
                    )}
                  </div>
                  {/* {error && <p className="text-red-500">{error.message}</p>} */}
                  <Button
                    type="submit"
                    className="w-full bg-customblue hover:bg-customBlue2"
                  >
                    Save
                  </Button>
                </form>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70}>
                <HomePart data={fields} />
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
