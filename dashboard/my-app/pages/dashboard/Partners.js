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
import Logos from "@/app/components/PartnersPart";
import { userContext } from "../../app/Context/userContext";
import { PartnersgetApi , PartnersaddApi } from "@/app/api/PartnersApi";
import { Height } from "@mui/icons-material";

export default function Personal() {
  const [error, setError] = useState({});
  const { user } = useContext(userContext);
  const [Name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [partners, setPartners] = useState([]);
  const [save , setSave]=useState(false)

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PartnersgetApi(localStorage.getItem('token'));
        if (response) {
          setPartners(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
      fetchData();
    
  }, [user?._id,save,partners]);
  
  const onSubmit = async (e) => {
    
    e.preventDefault();
    console.log("lena"+image) ; 
    const data = {PartnerName:Name,image:image}
    const rep = await PartnersaddApi(localStorage.getItem('token'),data);

    if(rep?.message === "success") {
      setName("");
      setImage("");
      setSave(!save) ;
    }else {
      setError(err) ; 
    }
  }


  return (
    <section className="w-full">
      <Box sx={{ display: "flex" }}>
        <DrawerMenu />
        <div className="flex w-full sm:flex-row flex-col ml-7 mt-10">
          <div className="flex-1 mt-10">
            <h1 className="font-bold text-3xl text-customBlue2 mb-8">
              Partners
            </h1>
            <div className="flex flex-col  justify-center " >
              <div className="" >
                <form onSubmit={onSubmit} className="mx-5 space-y-4">
                  <div className="flex flex-row space-x-16">
                    <div className="space-y-2">
                      <Label htmlFor="Name">Name</Label>
                      <Input
                        id="Name"
                        type="text"
                        placeholder="Name"
                        required
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="logos">Logos</Label>
                    <input
                      id="logos"
                      type="file"
                      onChange={handleImageChange}
                    />
                    {image && (
                      <div>
                        <img src={URL.createObjectURL(image)} alt="Current" width="100" />
                      </div>
                    )}
                  </div>

                  {error.error && <p className="text-red-500">{error.error}</p>}
                  <Button
                    type="submit"
                    className=" bg-customblue hover:bg-customBlue2"
                  >
                    Add
                  </Button>
                </form>
              </div>
             
              <div >
                <Logos partners={partners} /> 
              </div>
            </div>
          </div>
        </div>
      </Box>
    </section>
  );
}
