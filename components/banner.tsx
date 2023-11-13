import { cn } from "@/lib/utils";
import { cva,type VariantProps } from "class-variance-authority";
import { AlertTriangle,CheckCircleIcon } from "lucide-react";

const BannerVariants=cva(
"w-full border text-sm flex items-center text-center p-4",
{
    variants:{
        variant:{
            warning:"bg-yellow-200/80 border-yellow-30 text-primary",
            success:"bg-emerald-700 border-emerald-800 text-secondary",
        }
    },
    defaultVariants:{
        variant:"warning"
    }
}

);

interface BannerProps extends VariantProps<typeof BannerVariants>{
    label:string
}

const iconMap={
    warning:AlertTriangle,
    success:CheckCircleIcon,
}
const Banner=({
label,
variant
}:BannerProps)=>{

    const Icon=iconMap[variant||"warning"];
   return (
 
<div className={cn(BannerVariants({variant}))}>
 <Icon className="h-4 w-4 mr-3"/>
 {label}
</div>

   ); 
}

export default Banner;