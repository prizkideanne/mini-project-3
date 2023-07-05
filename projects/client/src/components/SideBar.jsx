import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function SideBar({ closeSideBar, isShow }) {
  const navigate = useNavigate();
  return (
    <div className={`${isShow ? "left-0 lg:block" : "hidden lg:block"}`}>
      <Card className="fixed bottom-0 left-0 right-0 top-0 w-screen bg-red-400 p-4 shadow-xl shadow-blue-gray-900/5 lg:fixed lg:right-auto lg:w-72">
        <div className="mb-2 flex flex-row justify-between p-4">
          <XMarkIcon onClick={closeSideBar} className="h-5 w-5 lg:hidden" />
        </div>
        <List className="gap-3">
          <ListItem
            onClick={() => navigate("/my-dashboard/my-store")}
            className="gap-3"
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            My Store
          </ListItem>
          <ListItem
            onClick={() => navigate("/my-dashboard/my-transaction")}
            className="gap-3"
          >
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            My Transaction
          </ListItem>
          <ListItem
            onClick={() => navigate("/my-dashboard/gross-income")}
            className="gap-3"
          >
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            My Income
          </ListItem>
          <ListItem
            onClick={() => navigate("/my-dashboard/product-form")}
            className="gap-3"
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Add Product
          </ListItem>
          <ListItem
            onClick={() => navigate("/my-dashboard/category-form")}
            className="gap-3"
          >
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Categories
          </ListItem>
        </List>
      </Card>
    </div>
  );
}

export default SideBar;
