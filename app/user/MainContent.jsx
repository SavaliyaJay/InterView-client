import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import SuggestionCard from "./SuggestionCard";
import { Breadcrumbs, Button, Progress, Typography } from "@material-tailwind/react";
import { selectContentList } from "@/redux/content/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionListByIdThunkAction } from "@/redux/content/action";
import Link from "next/link";

const MainContent = ({ subCategoryData }) => {
  const dispatch = useDispatch();

  const { questionByIdList } = useSelector(selectContentList);

  const totalPage = questionByIdList?.totalPages || 0;
  const [currentPage, setCurrentPage] = useState(1);

  console.log("totalPage:", totalPage);

  const { subCategoryId, categoryName, subCategoryName } = subCategoryData;

  useEffect(() => {
    const param = {
      page: currentPage,
      limit: 1
    };
    if (subCategoryId) {
      dispatch(fetchQuestionListByIdThunkAction({ subCategoryId, param }));
    }
  }, [subCategoryId, currentPage]);

  const nextBtn = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div>
        <Breadcrumbs>
          <Link href="/">
            <span className="opacity-60">home</span>
          </Link>
          <span className="opacity-60">Dashboard</span>
          <span className="opacity-60">{categoryName}</span>
          <span>{subCategoryName}</span>
        </Breadcrumbs>
      </div>
      <div className="mt-2 mx-2">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Typography color="blue-gray" variant="h6">
            Completed
          </Typography>
          <Typography color="blue-gray" variant="h6">
            {currentPage} of {totalPage ? totalPage : 1}
          </Typography>
        </div>
        <Progress color="blue-gray" value={(currentPage / totalPage) * 100} />
      </div>

      <div className="flex-grow flex mt-3 ml-1 mb-3">
        <div className="flex-grow bg-[#f1f1f1] rounded-md p-4">
          <div className="flex flex-col gap-2">
            <QuestionCard questions={questionByIdList?.questions} />
            <div className="bg-[#fff] rounded-md w-[26rem] md:w-[48rem] lg:w-[57rem]">
              <AnswerCard questions={questionByIdList?.questions} keyProp={currentPage} />
            </div>
            <SuggestionCard questions={questionByIdList?.questions} />
          </div>
        </div>
      </div>
      <div className="flex justify-between pb-2">
        <Button
          onClick={prevBtn}
          disabled={currentPage <= 1}
          className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding text-transparent bg-opacity-50 text-white font-bold rounded-md hover:from-blue-700 hover:to-purple-600"
        >
          {"< Previous"}
        </Button>
        <Button
          onClick={nextBtn}
          disabled={currentPage >= totalPage}
          className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding text-transparent bg-opacity-50 text-white font-bold rounded-md hover:from-blue-700 hover:to-purple-600"
        >
          {"Next >"}
        </Button>
      </div>
    </>
  );
};

export default MainContent;
