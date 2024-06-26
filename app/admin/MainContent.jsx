import ViewCategory from "@/components/admin/category/ViewCategory";
import AddCategory from "@/components/admin/category/AddCategory";
import AddQuestion from "@/components/admin/question/AddQuestion";
import ViewQuestion from "@/components/admin/question/ViewQuestion";
import ViewSubCategory from "@/components/admin/subCategory/ViewSubCategory";
import AddSubCategory from "@/components/admin/subCategory/AddSubCategory";
import React from "react";

const MainContent = ({ sidebarData }) => {
  let content = null;

  switch (sidebarData.type) {
    case "addCategory":
      content = (
        <div>
          <AddCategory />
        </div>
      );
      break;
    case "viewCategory":
      content = (
        <div>
          <ViewCategory />
        </div>
      );
      break;
    case "addSubCategory":
      content = (
        <div>
          <AddSubCategory />
        </div>
      );
      break;
    case "viewSubCategory":
      content = (
        <div>
          <ViewSubCategory />
        </div>
      );
      break;
    case "addQuestion":
      content = (
        <div>
          <AddQuestion />
        </div>
      );
      break;
    case "viewQuestion":
      content = (
        <div>
          <ViewQuestion />
        </div>
      );
      break;
    default:
      content = <div>Default</div>;
      break;
  }

  return <div>{content}</div>;
};

export default MainContent;
