import './App.css';
import React, { useEffect, useState } from "react";
import Requester from './network/Requester';


function HomeFn() { 
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    let userId = window.localStorage.getItem("USER_ID");
    let email = window.localStorage.getItem("USER_EMAIL");
    if (userId && email && email.length > 0) {
      new Requester().queryAllUsers(userId, email)
      .then((result) => {
        if (result.data) {
          setDataList(result.data);
        }
      })
    } else {
      alert("当前未登录，即将跳转到登录页面...");
      window.location.href = "/login";
    }
  }, []) 

  const onLogout = () => {
    window.localStorage.removeItem("USER_ID");
    window.localStorage.removeItem("USER_EMAIL");
    window.location.href = "/login";
    alert("已退出登录！");
  };

  const onDeleteUser = (deletingUserId) => {
    let userId = window.localStorage.getItem("USER_ID");
    let email = window.localStorage.getItem("USER_EMAIL");
    new Requester().deleteUser(userId, email, deletingUserId)
    .then((result) => {
      if (result.code === 0) {
        alert("删除成功！");
        window.location.href = "/";
      } else {
        alert(`删除失败！${result.message}`);
      }
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <center>
      <button onClick={onLogout} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        退出登录
      </button>
      </center>
        <table className="min-w-full bg-white">
          {/* 表头 */}
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">电子邮件</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700"></th>
            </tr>
          </thead>
          {/* 表格内容 */}
          <tbody>
            {dataList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">{item.id}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">{item.email}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                  <button onClick={() => onDeleteUser(item.id)} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeFn;
