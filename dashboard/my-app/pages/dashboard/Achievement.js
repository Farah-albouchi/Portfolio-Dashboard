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
import Achievement from "@/app/components/Achievement";
import { userContext } from "../../app/Context/userContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
AchievementAddApi,
AchievementUpdateApi,
AchievementDeleteApi,
AchievementgetApi
} from "@/app/api/AchievementsApi";
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
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState({});
  const [Achievements, setAchievements] = useState([]);
  const [save, setSave] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleAddAchievement = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await  AchievementAddApi(token, {
        value: value,
        description: description,
      });
      if (response) {
        setAchievements((prevAchievements) => [
          ...prevAchievements,
          { value: response.value, description: response.description }
        ]);
      }
      setValue("");
      setDescription("");
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  const handleDeleteAchievement = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await  AchievementDeleteApi(token, index);
      const updatedAchievements = Achievements.filter((_, i) => i !== index);
      setAchievements(updatedAchievements);
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      const token = localStorage.getItem("token");
      const rep = await AchievementUpdateApi(token, formData);
      if (rep) {
        setShowDialog(true);
        setSave(true);
      } else {
        setError({ message: rep });
      }
    } catch (err) {
      console.error( err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await AchievementgetApi(token);
        setData(response);
        if (response) {
          setTitle(response.title);
          setAchievements(response.Achievements);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user?._id, save]);

  const fields = { title,Achievements };

  return (
    <section className="w-full">
      <Box sx={{ display: "flex", width: '100%' }}>
        <DrawerMenu />
        <div className="flex sm:flex-row flex-col m-10 w-full">
          <div className="mt-10 w-full">
            <h1 className="font-bold sm:text- text-3xl text-customBlue2 mb-8">
              Achievements Section
            </h1>
            <ResizablePanelGroup
              direction="horizontal"
              style={{ height: "100%", width: "100%" }}
            >
              <ResizablePanel minSize={40} defaultSize={40}>
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
                  <div className="w-full max-w-sm">
                    <Label htmlFor="Achievements">Achievements</Label>
                    <ul className="space-y-2">
                      {Achievements && Achievements.length > 0 ? (
                        Achievements.map((Achievement, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center border p-2 rounded"
                          >
                            <div>
                              <p className="font-medium">{Achievement.value}</p>
                              <p className="text-sm text-gray-500">
                                {Achievement.description}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="text-red border-red hover:text-white hover:bg-red"
                              onClick={() => handleDeleteAchievement(index)}
                            >
                              Delete
                            </Button>
                          </li>
                        ))
                      ) : (
                        <p>No Achievements available</p>
                      )}
                    </ul>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-48 mt-10 border-green-400 text-green-700 hover:text-white hover:bg-green-700"
                        variant="outline"
                      >
                        Add new Achievement
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Add Information
                          </h4>
                        </div>
                        <div className="grid gap-2">
                          <div className="items-center gap-4">
                            <Label htmlFor="value">Value</Label>
                            <Input
                              id="Value"
                              placeholder="Achievement Value"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="items-center gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Achievement Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="h-24"
                            />
                          </div>
                          <Button
                          onClick={handleAddAchievement}
                          >Done</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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
                <Achievement data={fields} />
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
