import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {PartnersDeleteApi} from '../api/PartnersApi'


const Logos = ({ partners } ) => {

  const handleDelete = async (name) => {
    try {
        const result = await PartnersDeleteApi(name);
        if (result.message === 'success') {
            console.log('Partner deleted successfully');
            window.location.reload();
        } else {
            console.log('Something went wrong');
        }
    } catch (error) {
        console.error('Error deleting partner:', error);
    }
};

  return (
    <div className="bg-custombg grid sm:grid-cols-3 grid-cols-2 items-center sm:space-x-3 overflow-x-auto sm:overflow-x-hidden">
      {partners.map((partner) => (
        <Card className="space-x-10 my-10 h-96 flex flex-col items-center justify-center w-80" >
            <CardHeader>
    <CardTitle>{partner.PartnerName}</CardTitle>
  </CardHeader>
        
          <img
           src={`http://localhost:3000/${partner.image.replace(/\\/g, '/')}`} 
            alt={partner.PartnerName} 
            width={150} 
            height={150} 
          />
         
        <CardFooter >
        <Button 
                            type="button" 
                            className="my-5 bg-red hover:bg-rose-200 hover:text-red"
                            onClick={() => handleDelete(partner.PartnerName)}
                        >   Delete
                        </Button>
      </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Logos;
