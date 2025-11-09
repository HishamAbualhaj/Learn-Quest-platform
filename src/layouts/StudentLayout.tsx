import Header from "@/pages-content/Landing-Page/Header/Header";
interface StudentProps {
  children: React.ReactNode;
}
function Student({ children }: StudentProps) {
  return (
    <div className="h-full section_student border-none">
      <div className="pb-2">
        <Header isStudent={true} />
      </div>
      {children}
    </div>
  );
}

export default Student;
