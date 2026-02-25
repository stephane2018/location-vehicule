import { TickCircle, CloseCircle, Building, User } from "iconsax-reactjs";

export type ClientType = "company" | "individual";

interface CustomBadgeProps {
  is_active?: boolean
  label?: string
}

interface ClientTypeBadgeProps {
  type: ClientType
  className?: string
}

export function CustomBadge({
  is_active = true,
  label = "Actif",
}: CustomBadgeProps) {
    return(
        <div className={`${is_active ? "default" : "secondary"} px-2 py-0.5 w-fit  rounded-lg bg-green-100 border-green-500 border border-dashed text-green-500 text-xs`}>
                {is_active ? (
                  <span className="flex items-center gap-1">
                    <TickCircle size={14} variant="Bulk" color="currentColor" />
                    {label}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CloseCircle size={14} variant="Bulk" color="currentColor" />
                    {label}
                  </span>
                )}
        </div>
    );
}

export function ClientTypeBadge({ type, className }: ClientTypeBadgeProps) {
  console.log(type);
  
  // Normalize type values
  const normalizedType = type.toLowerCase();
  
  return (
    <div 
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border border-dashed ${
        normalizedType === "company" 
          ? "bg-blue-50 border-blue-300 text-blue-700" 
          : "bg-gray-50 border-gray-300 text-gray-700"
      } ${className || ""}`}
    >
      {normalizedType === "company" ? (
        <>
          <Building size={14} variant="Bulk" className="text-current" />
          Entreprise
        </>
      ) : (
        <>
          <User size={14} variant="Bulk" className="text-current" />
          Particulier
        </>
      )}
    </div>
  );
}

export default CustomBadge
