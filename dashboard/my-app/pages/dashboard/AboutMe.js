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
import AboutMe from "@/app/components/AboutMe";
import { userContext } from "../../app/Context/userContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AboutgetApi , SkillDeleteApi , AwardDeleteApi , educationDeleteApi , SkillAddApi ,AwardAddApi, EducationAddApi , AboutUpdateApi} from "@/app/api/AboutApi";
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
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [awards, setAwards] = useState([]);
  const [education, setEducation] = useState([]);
  const [AwardDes,setAwardDes] = useState("");
  const [EducDes,setEducDes] = useState("");
  const [data, setData] = useState({});
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProgress, setNewSkillProgress] = useState("");
  const [save, setSave] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

const handleAddSkill = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log("Adding skill:", newSkillName, newSkillProgress);
    const response = await SkillAddApi(token, {
      name: newSkillName,
      progress: newSkillProgress,
    });
    console.log("API Response:", response);

   
      if (response && response.name && response.progress) {
        setSkills((prevSkills) => [
          ...prevSkills,
          { name: response.name, progress: response.progress }

        ]);
      
      } else {
        console.error("Unexpected response data structure");
      }
  

    setNewSkillName("");
    setNewSkillProgress("");
  } catch (err) {
    console.error("Error adding skill:", err);
  }
};
const handleAddAward = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await AwardAddApi(token, {
      description: AwardDes,
    
    });
      if (response && response.description) {
        setAwards(
          response.awards
        );
      
      } else {
        console.error("Unexpected response data structure");
      }

    setAwardDes("");
  } catch (err) {
    console.error("Error adding awards:", err);
  }
};
const handleAddEducation = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await EducationAddApi(token, {
      description: EducDes,
    });
      if (response && response.description) {
        setEducation(
          response.education
        );
      
      } else {
        console.error("Unexpected response data structure");
      }

    setEducDes("");
  } catch (err) {
    console.error("Error adding eduaction:", err);
  }
};
  const handleDeleteSkill = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await SkillDeleteApi(token, index);
      const updatedSkills = skills.filter((_, i) => i !== index);
      setSkills(updatedSkills);
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const handleDeleteAward = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await AwardDeleteApi(token, index);
      const updatedAwards = awards.filter((_, i) => i !== index);
      setAwards(updatedAwards);
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };
  const handleDeleteEducation = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await educationDeleteApi(token, index);
      const updatedEducation = education.filter((_, i) => i !== index);
      setEducation(updatedEducation);
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title',title);
      formData.append('title2',title2);
      formData.append('description',description);
      if (image && image !== data.image) {
        formData.append("image", image);
      }
      const token = localStorage.getItem('token');
      console.log(token) ; 
      const rep = await AboutUpdateApi( token , formData);
      console.log(rep);
      if (rep ) {
        setShowDialog(true);
        console.log("tt")
        window.location.reload();
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
        const token = localStorage.getItem('token');
        const response = await AboutgetApi(token);
        setData(response);
        if (response) {
          setTitle(response.title);
          setTitle2(response.title2);
          setDescription(response.description);
          setImage(response.image);
          setSkills(response.skills);
          setAwards(response.awards);
          setEducation(response.education);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user?._id, save]);
  const fields = {title,title2,image,description,awards,skills,education}
  return (
    <section className="w-full">
      <Box sx={{ display: "flex" }}>
        <DrawerMenu />
        <div className="flex sm:flex-row flex-col m-10">
          <div className="mt-10">
            <h1 className="font-bold sm:text- text-3xl text-customBlue2 mb-8">
              About Me Section
            </h1>
            <ResizablePanelGroup direction="horizontal" style={{ height: "100%" }}>
              <ResizablePanel defaultSize={45}>
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
                    <Label htmlFor="Title2">Title2</Label>
                    <Input
                      id="Title2"
                      type="text"
                      placeholder="Title2"
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
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <input
                      id="picture"
                      type="file"
                      onChange={handleImageChange}
                    />
                    {image && (
                      <div>
                        <img  src={`http://localhost:3000/${image}`}  alt="Current" width="100" />
                      </div>
                    )}
                  </div>
                
                  <Tabs defaultValue="Skills">
                    <TabsList className="flex justify-center">
                      <TabsTrigger value="Skills">Skills</TabsTrigger>
                      <TabsTrigger value="Awards">Awards</TabsTrigger>
                      <TabsTrigger value="Education">Education</TabsTrigger>
                    </TabsList>
                    <TabsContent className="flex flex-col items-center justify-center" value="Skills">
                      <div className="w-full max-w-sm">
                        <ul className="space-y-2">
                          {skills && skills.length > 0 ? (
                          skills.map((skill, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center border p-2 rounded"
                            >
                              <div>
                                <p className="font-medium">{skill.name}</p>
                                <p className="text-sm text-gray-500">
                                  Progress: {skill.progress}%
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                className="text-red border-red hover:text-white hover:bg-red"
                                onClick={() => handleDeleteSkill(index)}
                              >
                                Delete
                              </Button>
                            </li>
                          ))
                        ): (
                          <p>No skills available</p>
                        )
                      }
                        </ul>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="w-48 mt-10 border-green-400 text-green-700 hover:text-white hover:bg-green-700 " variant="outline">Add new skill</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Add skill</h4>
                            </div>
                            <div className="grid gap-2">
                              <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="Name">Name</Label>
                                <Input
                                  id="Name"
                                  placeholder="Skill Name"
                                  value={newSkillName}
                                  onChange={(e) => setNewSkillName(e.target.value)}
                                  className="col-span-2 h-8"
                                />
                              </div>

                              <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="newSkillProgress">Progress (%)</Label>
                                <Input
                                  id="newSkillProgress"
                                  type="number"
                                  placeholder="Progress (%)"
                                  value={newSkillProgress}
                                  onChange={(e) => setNewSkillProgress(e.target.value)}
                                  className="col-span-2 h-8"
                                />
                              </div>
                              <Button onClick={handleAddSkill}>Done</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TabsContent>
                    <TabsContent className="flex flex-col items-center justify-center" value="Awards">
                      <div className="w-full max-w-sm">
                        <ul className="space-y-2">
                          {awards.map((award,index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center border p-2 rounded"
                            >
                              <div>
                                <p className="font-medium">{award}</p>
                              </div>
                              <Button
                                variant="outline"
                                className="text-red border-red hover:text-white hover:bg-red"
                                onClick={() => handleDeleteAward(index)}
                              >
                                Delete
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="w-48 mt-10 border-green-400 text-green-700 hover:text-white hover:bg-green-700 " variant="outline">Add new Award</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Add Award</h4>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="award-description">Description</Label>
                              <Textarea
                               value={AwardDes}
                               onChange={(e) => setAwardDes(e.target.value)}
                                id="award-description"
                                placeholder="Description"
                                className="col-span-2 h-20"
                              />
                            </div>
                            <Button onClick={handleAddAward} >Done</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TabsContent>
                    <TabsContent className="flex flex-col items-center justify-center" value="Education">
                      <div className="w-full max-w-sm">
                        <ul className="space-y-2">
                          {education.map((e , index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center border p-2 rounded"
                            >
                              <div>
                                <p className="font-medium">{e}</p>

                              </div>
                              <Button
                                variant="outline"
                                className="text-red border-red hover:text-white hover:bg-red"
                                onClick={() => handleDeleteEducation(index)}
                              >
                                Delete
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="w-48 mt-10 border-green-400 text-green-700 hover:text-white hover:bg-green-700 " variant="outline">Add Education</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Add education</h4>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="education-description">Description</Label>
                              <Textarea
                                id="education-description"
                                placeholder="Description"
                                className="col-span-2 h-20"
                                value={EducDes}
                                onChange={(e) => setEducDes(e.target.value)}
                              />
                            </div>
                            <Button onClick={handleAddEducation}>Done</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TabsContent>
                  </Tabs>
                  {error.error && <p className="text-red-500">{error.error}</p>}
                  <Button type="submit" className="w-full bg-customblue hover:bg-customBlue2">
                    Save
                  </Button>
                </form>
                 
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70}>
                <AboutMe data={fields} />
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
