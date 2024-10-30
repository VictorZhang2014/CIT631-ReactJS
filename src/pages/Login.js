import '../App.css';
import React, { useState } from "react";
import Requester from '../network/Requester';

function LoginFn() {
  const [formData, setFormData] = useState({ 
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    new Requester().login(formData.email, formData.password)
    .then((result) => {
      if (result.code === 0) {
        alert("登录成功！");
        window.localStorage.setItem("USER_ID", result.data.userId);
        window.localStorage.setItem("USER_EMAIL", formData.email);
        window.location.href = "/";
      } else {
        alert(`登录失败！${result.message}`);
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          登录
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 电子邮件 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              电子邮件
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* 密码 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* 提交按钮 */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              登录
            </button>

            <a href="/register" className="font-medium text-blue-600 dark:text-blue-500 hover:underline items-end gap-y-2">还没有账号，注册一个？</a>

          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFn;
