import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DrawerMenu from "../../app/components/drawer";
import Box from "@mui/material/Box";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { userContext } from "../../app/Context/userContext";
import {
  TestimonialsgetApi,
  TestimonialsAddApi,
  TestimonialsUpdateApi,
  TestimonialsDeleteApi,
} from "@/app/api/TestimonialsApi";
import Testimonials from "@/app/components/Testimonials";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export default function Reviews() {
  const [error, setError] = useState({});
  const { user, setUser } = useContext(userContext);
  const [description, setDescription] = useState("");
  const [Newdescription, setNewDescription] = useState("");
  const [name, setName] = useState("");
  const [Newname, setNewName] = useState("");
  const [image, setImage] = useState("");
  const [Newimage, setNewImage] = useState("");
  const [job, setJob] = useState("");
  const [NewJob, setNewJob] = useState("");
  const [review, setReview] = useState();
  const [Newreview, setNewReview] = useState();
  const [data, setData] = useState({});
  const [people, setPeople] = useState([]);
  const [save, setSave] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await TestimonialsgetApi(token);
        setData(response);
        if (response) {
          setPeople(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user?._id, save]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddTestimonials = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await TestimonialsAddApi(token, {
        name: Newname,
        image: Newimage,
        job: NewJob,
        description: Newdescription,
        review: Newreview,
      });
      console.log("API Response:", response);

      if (response) {
        setPeople((prevPeople) => [
          ...prevPeople,
          {
            name: response.name,
            description: response.description,
            image: response.image,
            job: response.job,
            review: response.review,
          },
        ]);
      } else {
        console.error("Unexpected response data structure");
      }

      setNewName("");
      setNewImage("");
      setNewDescription("");
      setNewJob("");
      setNewReview();
    } catch (err) {
      console.error("Error adding testimonial:", err);
    }
  };

  const handleUpdateTestimonials = async () => {
    if (!selectedTestimonial) return;

    try {
      const token = localStorage.getItem("token");
      const response = await TestimonialsUpdateApi(token, selectedTestimonial._id, {
        name,
        image,
        job,
        description,
        review,
      });

      if (response) {
        setPeople((prevPeople) =>
          prevPeople.map((person) =>
            person._id === selectedTestimonial._id ? response : person
          )
        );
        setSelectedTestimonial(null);
        setName("");
        setImage("");
        setJob("");
        setDescription("");
        setReview("");
      } else {
        console.error("Unexpected response data structure");
      }
    } catch (err) {
      console.error("Error updating testimonial:", err);
    }
  };

  const handleDeleteTestimonials = async (id, index) => {
    try {
      const token = localStorage.getItem("token");
      await TestimonialsDeleteApi(token, id);
      const updatedPeople = people.filter((_, i) => i !== index);
      setPeople(updatedPeople);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleModifyClick = (person) => {
    setSelectedTestimonial(person);
    setName(person.name);
    setImage(person.image);
    setJob(person.job);
    setDescription(person.description);
    setReview(person.review);
  };

  return (
    <section className="w-full">
      <Box sx={{ display: "flex", width: "100%" }}>
        <DrawerMenu />
        <div className="flex sm:flex-row flex-col w-full">
          <div className="mt-10 mb-44 w-full">
            <h1 className="font-bold mt-10 ml-10 text-3xl text-customBlue2 mb-8">
              Testimonials Section
            </h1>
            <ResizablePanelGroup
              direction="horizontal"
              style={{ height: "100%", width: "100%" }}
            >
              <ResizablePanel minSize={40} defaultSize={40}>
                <div className="mx-5 space-y-4 flex flex-col justify-center items-center">
                  <div>
                    <ul className="space-y-2">
                      {people && people.length > 0 ? (
                        people.map((person, index) => (
                          <li
                            key={index}
                            className="flex flex-col w-[400px] border p-2 rounded"
                          >
                            <div className="flex flex-row space-x-7">
                              <div className="w-36">
                                <p className="font-medium">{person.name}</p>
                                <p className="text-sm text-gray-500">{person.job}</p>
                                <p className="text-sm font-normal">
                                  {person.description}
                                </p>
                              </div>
                              {person.image && (
                                <div>
                                  <img
                                    src={person.image}
                                    alt="Current"
                                    width="100"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex space-y-4 space-x-3 flex-row justify-end items-end">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="hover:text-white hover:bg-slate-600"
                                    onClick={() => handleModifyClick(person)}
                                  >
                                    Modify
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 mt-2" >
                                  <div className="grid gap-4">
                                    <div className="grid gap-2">
                                      <div className="items-center gap-4">
                                        <Label htmlFor="Name">Name</Label>
                                        <Input
                                          id="Name"
                                          placeholder="Enter your Name"
                                          value={name}
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          className="col-span-2 h-8"
                                        />
                                      </div>
                                      <div className="items-center gap-4">
                                        <Label htmlFor="Job">Job</Label>
                                        <Input
                                          id="Job"
                                          placeholder="Enter your Job"
                                          value={job}
                                          onChange={(e) =>
                                            setJob(e.target.value)
                                          }
                                          className="col-span-2 h-8"
                                        />
                                      </div>
                                      <div className="items-center gap-4">
                                        <Label htmlFor="Description">Description</Label>
                                        <Textarea
                                          id="Description"
                                          placeholder="Description"
                                          value={description}
                                          onChange={(e) =>
                                            setDescription(e.target.value)
                                          }
                                          className="h-24"
                                        />
                                      </div>
                                      <div className="items-center gap-4">
                                        <Label htmlFor="Review">Review</Label>
                                        <Input
                                          id="Review"
                                          type="number"
                                          placeholder="Enter number of stars (max 5)"
                                          value={review}
                                          min={1}
                                          max={5}
                                          onChange={(e) =>
                                            setReview(
                                              Math.max(
                                                1,
                                                Math.min(5, Number(e.target.value))
                                              )
                                            )
                                          }
                                          className="col-span-2 h-8"
                                        />
                                      </div>
                                      <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="picture">Picture</Label>
                                        <input
                                          id="picture"
                                          type="file"
                                          onChange={(e) => setImage(e.target.files[0])}
                                        />
                                        {image && (
                                          <div>
                                            <img
                                              src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                              alt="Current"
                                              width="100"
                                            />
                                          </div>
                                        )}
                                      </div>
                                      <Button onClick={handleUpdateTestimonials}>Done</Button>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                              <Button
                                variant="outline"
                                className="text-red border-red hover:text-white hover:bg-red"
                                onClick={() =>
                                  handleDeleteTestimonials(person._id, index)
                                }
                              >
                                Delete
                              </Button>
                            </div>
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
                    <PopoverContent className="w-80 mt-2 absolute z-0">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <div className="items-center gap-4">
                            <Label htmlFor="NewName">Name</Label>
                            <Input
                              id="NewName"
                              placeholder="Enter your Name"
                              value={Newname}
                              onChange={(e) => setNewName(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="items-center gap-4">
                            <Label htmlFor="NewJob">Job</Label>
                            <Input
                              id="NewJob"
                              placeholder="Enter your Job"
                              value={NewJob}
                              onChange={(e) => setNewJob(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="items-center gap-4">
                            <Label htmlFor="NewDescription">Description</Label>
                            <Textarea
                              id="NewDescription"
                              placeholder="Description"
                              value={Newdescription}
                              onChange={(e) => setNewDescription(e.target.value)}
                              className="h-24"
                            />
                          </div>
                          <div className="items-center gap-4">
                            <Label htmlFor="NewReview">Review</Label>
                            <Input
                              id="NewReview"
                              type="number"
                              placeholder="Enter number of stars (max 5)"
                              value={Newreview}
                              min={1}
                              max={5}
                              onChange={(e) =>
                                setNewReview(
                                  Math.max(1, Math.min(5, Number(e.target.value)))
                                )
                              }
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="NewPicture">Picture</Label>
                            <input
                              id="NewPicture"
                              type="file"
                              onChange={(e) => setNewImage(e.target.files[0])}
                            />
                            {Newimage && (
                              <div>
                                <img
                                  src={URL.createObjectURL(Newimage)}
                                  alt="Current"
                                  width="100"
                                />
                              </div>
                            )}
                          </div>
                          <Button onClick={handleAddTestimonials}>Done</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel maxSize={70} defaultSize={70}>
                
                  <Testimonials people={people} />
                
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </Box>
    </section>
  );
}
