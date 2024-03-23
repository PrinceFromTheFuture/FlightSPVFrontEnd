import { ReactNode } from "react";

interface NavmenueProps {
  children: ReactNode;
}
/* 
<div className="fixed bottom-[0px] left-[0px] bg-blue w-full h-8">
<div className="w-contentMaxWidth flex items-center justify-between"></div>
</div> */
const Navmenue = ({ children }: NavmenueProps) => {
  return <>{children}</>;
};

export default Navmenue;
