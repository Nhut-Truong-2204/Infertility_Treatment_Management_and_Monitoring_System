export default function Paragraph({ title, content }) {
  return (
    <div className="flex justify-center mt-[100px] mb-[200px]">
      <div className="relative w-[1024px] ">
        <h1
          className="text-[40px] text-black"
          style={{ fontFamily: "Times New Roman, Times, serif" }}
        >
          {title}
        </h1>
        <p className="text-[30px] mt-[50px] " style={{ fontFamily: "Times New Roman, Times, serif"}}>{content}</p>
      </div>
    </div>
  );
}