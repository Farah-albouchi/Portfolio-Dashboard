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
import Services from "@/app/components/Services";
import { userContext } from "../../app/Context/userContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
 ServicegetApi,
 ServiceAddApi,
 ServiceUpdateApi,
 ServiceDeleteApi
} from "@/app/api/ServiceApi";
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

export default function About() {
  const [error, setError] = useState({});
  const { user, setUser } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const [description, setDescription] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const [NewDescription, setNewDescription] = useState("");
  const [Name, setName] = useState("");

  const [data, setData] = useState({});
  const [ServicesCom, setServices] = useState([]);
  const [save, setSave] = useState(false);

  const handleAddService = async () => {
    try {
      const token = localStorage.getItem('token');
     
      const response = await  ServiceAddApi(token, {
        title: Name,
    
        description: NewDescription,
      });
      console.log("API Response:", response);
  
     
        if (response ) {
          setServices((prevServices) => [
            ...prevServices,
            { title: response.title, description: response.description }
          ]);
        
        } else {
          console.error("Unexpected response data structure");
        }
    
  
      setName("");
      setNewDescription("");
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };
  const handleDeleteService = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await  ServiceDeleteApi(token, index);
      const updatedServices = Services.filter((_, i) => i !== index);
      setServices(updatedServices);
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("title2", title2);
      formData.append("description", description);
     
      const token = localStorage.getItem("token");
      console.log(token);
      const rep = await ServiceUpdateApi(token, formData);
      console.log(rep);
      if (rep) {
        console.log("gg");
        setShowDialog(true);
        // window.location.reload();
        setSave(!save);
      } else {
        setError({ message: rep });
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await ServicegetApi(token);
        setData(response);
        if (response) {
          setTitle(response.title);
          setTitle2(response.title2);
          setDescription(response.description);
          setServices(response.services);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user?._id, save]);
  const fields = { title,title2, description , ServicesCom };
  return (
    <section className="w-full">
      <Box sx={{ display: "flex" }}>
        <DrawerMenu />
        <div className="flex sm:flex-row w-full flex-col ml-10 my-10">
          <div className="mt-10 w-full">
            <h1 className="font-bold sm:text- text-3xl text-customBlue2 mb-8">
              Services Section
            </h1>
            <ResizablePanelGroup
              direction="horizontal"
              style={{ height: "100%" }}
            >
              <ResizablePanel minSize={50} defaultSize={50}>
                <form className="mx-5 space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="Title">Title</Label>
                    <Input
                      id="Title"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Title2">Title 2</Label>
                    <Input
                      id="Title2"
                      type="text"
                      placeholder="Second Title"
                      value={title2}
                      onChange={(e) => setTitle2(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="h-24"
                    />
                  </div>
                  <div className="w-full max-w-sm">
                  <Label htmlFor="Services">Services</Label>
                        <ul className="space-y-2">
                          {ServicesCom && ServicesCom.length > 0 ? (
                          ServicesCom.map((service, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center border p-2 rounded"
                            >
                              <div>
                                <p className="font-medium">{service.title}</p>
                                <p className="text-sm text-gray-500">
                                   {service.description}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                className="text-red border-red hover:text-white hover:bg-red"
                                onClick={() => handleDeleteService(index)}
                              >
                                Delete
                              </Button>
                            </li>
                          ))
                        ): (
                          <p>No services available</p>
                        )
                      }
                        </ul>
                      </div>
                  <Popover>
                    <PopoverTrigger asChild >
                      <Button
                        className="w-48 mt-10 border-green-400 text-green-700 hover:text-white hover:bg-green-700 "
                        variant="outline"
                      >
                        Add new service
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Add Informations
                          </h4>
                        </div>
                        <div className="grid gap-2">
                          <div className=" items-center gap-4">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                              id="Name"
                              placeholder="Service Name"
                              value={Name}
                              onChange={(e) => setName(e.target.value)}
                              className="col-span-2 h-8"
                            />{" "}
                          </div>

                          <div className="items-center gap-4">
                            <Label htmlFor="NewDescription">Description</Label>
                            <Textarea
                              id="NewDescription"
                              placeholder=" Service Description"
                              value={NewDescription}
                              onChange={(e) => setNewDescription(e.target.value)}
                              className="h-24"
                            />
                          </div>
                          <Button onClick={handleAddService} >Done</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {error.error && <p className="text-red-500">{error.error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-customblue hover:bg-customBlue2"
                  >
                    Save
                  </Button>
                </form>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel maxSize={60} defaultSize={60}>
                <Services data={fields} />
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
