"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DrawerMenu from "../../app/components/drawer";
import Box from "@mui/material/Box";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Portfolio from "@/app/components/Portfolio";
import { userContext } from "../../app/Context/userContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ProjectgetApi,
  TypeAddApi,
  TypeDeleteApi,
  ProjectAddApi,
  ProjectDeleteApi,
  ProjectUpdateApi
} from "@/app/api/ProjectApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState({});
  const [types, setTypes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [save, setSave] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [position, setPosition] = useState("");
  const [dropdownLabel, setDropdownLabel] = useState("choose a type ▼");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddType = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await TypeAddApi(token, { type });
      if (response) {
        setTypes((prevTypes) => [...prevTypes, type]);
      }
      setType("");
    } catch (err) {
      console.error("Error adding type:", err);
    }
  };

  const handleDeleteType = async (index) => {
    try {
      const token = localStorage.getItem("token");
      await TypeDeleteApi(token, index);
      const updatedType = types.filter((_, i) => i !== index);
      setTypes(updatedType);
    } catch (err) {
      console.error("Error deleting type:", err);
    }
  };
  const handleAddProject = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await ProjectAddApi(token, {
        name: name,
        type: position,
        image: image,
      });
      console.log("API Response:", response);


      if (response) {
        setProjects((prevProjects) => [
          ...prevProjects,
          { name: response.name, type: response.type, image: response.image }

        ]);

      } else {
        console.error("Unexpected response data structure");
      }


      setName("");
      setPosition("");
      setImage("");
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };
  const handleDeleteProject = async (index) => {
    try {
      const token = localStorage.getItem("token");
      await ProjectDeleteApi(token, index);
      const updatedp = projects.filter((_, i) => i !== index);
      setProjects(updatedp);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await ProjectgetApi(token);
        setData(response);
        if (response) {
          setTitle(response.title);
          setTypes(response.types);
          setProjects(response.Projects);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user?._id, save]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      const token = localStorage.getItem('token');
      console.log(token);
      const rep = await ProjectUpdateApi(token, formData);
      console.log(rep);
      if (rep) {
        console.log("tt")
        // window.location.reload();
        setShowDialog(true);
        setSave(true);
      } else {
        setError({ message: rep });
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };
  const fields = { title, projects, types }
  return (
    <section className="w-full">
      <Box sx={{ display: "flex", width: "100%" }}>
        <DrawerMenu />
        <div className="flex sm:flex-row flex-col m-10 w-full">
          <div className="mt-10 w-full">
            <h1 className="font-bold sm:text- text-3xl text-customBlue2 mb-8">
              Project Section
            </h1>
            <ResizablePanelGroup
              direction="horizontal"
              style={{ height: "100%", width: "100%" }}
            >
              <ResizablePanel minSize={40} defaultSize={40}>
                <form onSubmit={handleSubmit} className="mx-5 space-y-4">
                  <div className="space-y-2 mb-2">
                    <Label htmlFor="Title">Title</Label>
                    <Input
                      id="Title"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <Label htmlFor="Achievements">Type</Label>
                  <div className="border border-solid p-2 rounded-xl flex flex-col justify-center items-center">
                    <div className="w-full max-w-sm">
                      <ul className="space-y-2">
                        {types && types.length > 0 ? (
                          types.map((t, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center border p-2 rounded"
                            >
                              <div>
                                <p className="font-medium">{t}</p>
                              </div>
                              <Button
                                variant="outline"
                                className="text-red border-red hover:text-white hover:bg-red"
                                onClick={() => handleDeleteType(index)}
                              >
                                Delete
                              </Button>
                            </li>
                          ))
                        ) : (
                          <p>No types available</p>
                        )}
                      </ul>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="w-48 mt-10 border-green-400 text-green-700 hover:text-white hover:bg-green-700"
                          variant="outline"
                        >
                          Add new Type
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2"></div>
                          <div className="grid gap-2">
                            <div className="items-center gap-4">
                              <Input
                                id="Value"
                                placeholder="New Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="col-span-2 h-8"
                              />
                            </div>
                            <Button onClick={handleAddType}>Done</Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Label htmlFor="Achievements">Project</Label>
                  <div className="border border-solid p-2 mb-2 rounded-xl flex flex-col justify-center items-center">
                    <div className="w-full max-w-sm">
                      <ul className="space-y-2">
                        {projects && projects.length > 0 ? (
                          projects.map((project, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center border p-2 rounded"
                            >
                              <div className="flex justify-center items-center flex-row space-x-7">
                                <div className="w-36">
                                  <p className="font-medium">{project.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {project.type}
                                  </p>
                                </div>
                                {project.image && (
                                  <div>
                                    <img
                                      src={project.image}
                                      alt="Current"
                                      width="100"
                                    />
                                  </div>
                                )}
                              </div>
                              <Button
                                onClick={() => handleDeleteProject(index)}
                                variant="outline"
                                className="text-red border-red hover:text-white hover:bg-red"
                              >
                                Delete
                              </Button>
                            </li>
                          ))
                        ) : (
                          <p>No projects available</p>
                        )}
                      </ul>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="w-48 mt-10 border-green-400 text-green-700 hover:text-white hover:bg-green-700"
                          variant="outline"
                        >
                          Add new Project
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2"></div>
                          <div className="grid gap-2">
                            <div className="items-center gap-4">
                              <Label htmlFor="Name">Project Name</Label>
                              <Input
                                id="Value"
                                placeholder="Project link or Name "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-2 h-8"
                              />
                            </div>
                            <Label htmlFor="type">Type</Label>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                  {dropdownLabel}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Types</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                  value={position}
                                  onValueChange={(value) => {
                                    setPosition(value);
                                    setDropdownLabel(`${value.charAt(0).toUpperCase() + value.slice(1)} ▼`);
                                  }}
                                >
                                  {
                                    types.map((t, index) => (

                                      <DropdownMenuRadioItem value={t} >
                                        {t}
                                      </DropdownMenuRadioItem>

                                    ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="picture">Picture</Label>
                              <input
                                id="picture"
                                type="file"
                                onChange={handleImageChange}
                              />
                              {image && (
                                <div>
                                  <img src={`http://localhost:3000/${image}`} alt="Current" width="100" />
                                </div>
                              )}
                            </div>
                            <Button
                              onClick={handleAddProject}
                            >Done</Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {error.message && (
                    <p className="text-red-500">{error.message}</p>
                  )}
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
                <Portfolio data={fields} />
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
