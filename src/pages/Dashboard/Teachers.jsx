import React, { useContext, useState } from "react";
import Title from "../../component/Title";
import TeacherCart from "../../component/TeacherCart";
import { MainContext } from "../../context/Context";
import EmptyImg from "../../assets/images/empty-array.png";
import TableHeading from "../../component/TableThead";
import { Link } from "react-router-dom";
import HeaderTop from "../../component/HeaderTop";
import { HeadPhone, SearchIcon, Top } from "../../assets/images/Icon";
import Input from "../../component/Input";

function Teachers() {
  const tableThead = [
    {
      id: 1,
      title: "Name",
    },
    {
      id: 2,
      title: "Subject",
    },
    {
      id: 3,
      title: "Class",
    },
    {
      id: 4,
      title: "Email Adress",
    },
    {
      id: 5,
      title: "Gender",
    },
    {
      id: 6,
      title: "Actions",
    },
  ];
  const { teachersArray: initialTeachersArray } = useContext(MainContext);
  const [teachersArray, setTeachersArray] = useState(initialTeachersArray);

  function searchFromArray(e) {
    const value = e.target.value.toLowerCase();
    const findedArray = initialTeachersArray.filter(
      (teacher) =>
        teacher.fullName.toLowerCase().includes(value) || teacher.email.toLowerCase().includes(value)
    );
    setTeachersArray(findedArray);
  }

  return (
    <div className="mx-[32px] h-screen overflow-y-auto">
      <HeaderTop />
      <header className="flex items-center justify-between">
        <Title
          title={"Teachers"}
          extraStyle={
            "py-[22px] font-kubmh text-start !font-medium !leading-[24.8px] !text-[20px]"
          }
        />
        <Link
          to="/teachers/add"
          className="py-3 px-[14px] bg-primary-20 text-white font-semibold leading-[17.36px] text-sm rounded"
        >
          Add Teachers
        </Link>
      </header>
      <div className="flex items-center py-4 pl-4 pr-5 bg-gray-5">
        <SearchIcon />
        <Input
          onInput={(e) => searchFromArray(e)}
          name={"valueInput"}
          placeholder={"Search for a student by name or email"}
          type={"text"}
          extraStyle={"bg-transparent border-none"}
        />
      </div>
      <div className="mt-[30px]">
        {teachersArray.length ? (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left ">
              <thead className="">
                <tr>
                  {tableThead.map((title) => (
                    <TableHeading key={title.id} title={title.title} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {teachersArray.map((teacher, index) => (
                  <TeacherCart key={index + 1} teacher={teacher} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
         <div className="relative">

           <img src={EmptyImg} alt="emtyp-arr" />
           <button className="bg-[#152259]  absolute bottom-[2px] right-[19px]  text-white py-[21px] px-[24px] rounded-[30px] flex gap-[38px] items-center">
            <div className='flex items-center gap-2'>

              <HeadPhone />
              <p>Support</p>
            </div>
            <Top />
          </button>
         </div>
          
        )}
      </div>
    </div>
  );
}

export default Teachers;
