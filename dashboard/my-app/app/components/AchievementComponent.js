
const AchievementComponent = ({title , description}) => {
        return (
            <div className="flex flex-col bg-white rounded-2xl px-5 h-32 w-44  justify-center items-center">
               <h1 className="text-customblack text-xl pt-5 mb-4 ">
                {title}
               </h1>
               <p className="text-customblack text-sm text-center ">
               {description}
               </p>
            </div>
        ) ;
}
export default AchievementComponent ;