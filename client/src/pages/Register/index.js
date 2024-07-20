import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoading } from "../../redux/loadersSlice";
import { getAntdFormInputRules } from "../../utils/helpers";

function Register() {
  const navigate=useNavigate();
  const { buttonLoading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  
    const onFinish = async (values) => {
      try {
        dispatch(SetButtonLoading(true));
        const response = await RegisterUser(values);
        dispatch(SetButtonLoading(false));
        if (response.success) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        dispatch(SetButtonLoading(false));
        message.error(error.message);
      }
    };
    useEffect(() => {
      if (localStorage.getItem("token")) {
          navigate("/");
      }
    }, []);
  

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[420px]">
          <h1 className="text-xl text-gray-700">Unlock Your Team's Potential: Register for EfficiencySee</h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={getAntdFormInputRules}
            >
              <Input type="password" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={buttonLoading}
            >
              {buttonLoading ? "Loading" : "Register"}
            </Button>
            <div className="flex justify-center mt-5">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
      <div className="bg-primary flex-1 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-7xl text-white animate-slidein">EfficienSEE</h1>
          <span className="text-white mt-5 animate-slidein">
            - Empowering Teams, Elevating Performance
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;