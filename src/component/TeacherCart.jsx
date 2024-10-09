import { LuMoreHorizontal } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useContext, useState } from "react";
import { MainContext } from "../context/Context";
import { Link } from "react-router-dom";

function TeacherCart({ teacher }) {
  const { teachersArray, setTeachersArray } = useContext(MainContext);
  const { fullName, email, subject, classes, gender, imgSrc, id } = teacher;
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [teacherToRemove, setTeacherToRemove] = useState(null);

  const removeTeacher = (id) => {
    const newTeachersArray = teachersArray.filter(
      (teacher) => teacher.id !== id
    );
    setTeachersArray([...newTeachersArray]); 
    localStorage.setItem("teachers", JSON.stringify([...newTeachersArray]));
  };
  

  const handleDelete = (id) => {
    setTeacherToRemove(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    removeTeacher(teacherToRemove);
    setIsModalOpen(false); 
  };

  return (
    <>
      <tr className="even:bg-[#EBF6FF80]">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <div className="flex items-center gap-2">
            <img
              width={24}
              height={24}
              className="object-cover rounded-full"
              src={imgSrc}
              alt=""
            />
            <h1 className="leading-[14.88px] text-xs font-medium font-kubmh text-gray-400">
              {fullName}
            </h1>
          </div>
        </th>
        <td className="px-6 py-4 capitalize leading-[14.88px] text-xs font-medium font-kubmh text-gray-400">
          {subject}
        </td>
        <td className="px-6 py-4 capitalize leading-[14.88px] text-xs font-medium font-kubmh text-gray-400">
          {classes}
        </td>
        <td className="px-6 py-4 leading-[14.88px] text-xs font-medium font-kubmh text-gray-400">
          {email}
        </td>
        <td className="px-6 py-4 capitalize leading-[14.88px] text-xs font-medium font-kubmh text-gray-400">
          {gender}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to={`/teachers/${id}`}>
              <LuMoreHorizontal className="cursor-pointer" />
            </Link>
            <FaTrash
              onClick={() => handleDelete(id)}
              className="cursor-pointer text-rose-600"
            />
            <Link to={`/teachers/update/${id}`}>
              <MdEdit className="text-green-600 cursor-pointer" />
            </Link>
          </div>
        </td>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">
              O'chirishni xohlaysizmi?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeacherCart;
