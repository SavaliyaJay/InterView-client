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
    <div className="flex flex-col h-full">
      <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-gray-800/50 mb-4">
        <Breadcrumbs className="bg-transparent">
          <Link href="/">
            <span className="opacity-80 text-blue-300 hover:text-blue-200 transition-colors duration-300">
              home
            </span>
          </Link>
          <span className="opacity-80 text-blue-300">Dashboard</span>
          <span className="opacity-80 text-blue-300">{categoryName}</span>
          <span className="text-white font-medium">{subCategoryName}</span>
        </Breadcrumbs>

        <div className="mt-4 mx-2">
          <div className="mb-3 flex items-center justify-between gap-4">
            <Typography color="white" variant="h6" className="font-medium text-base">
              Progress
            </Typography>
            <div className="flex items-center bg-gray-900/70 px-3 py-1 rounded-lg border border-blue-500/30">
              <Typography color="white" variant="h6" className="font-medium text-base">
                <span className="text-blue-400">{currentPage}</span>
                <span className="mx-2 text-gray-500">/</span>
                <span>{totalPage ? totalPage : 1}</span>
              </Typography>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentPage / (totalPage || 1)) * 100}%` }}
            />
          </div>

          <div className="flex justify-between pb-2 mt-6">
            <Button
              onClick={prevBtn}
              disabled={currentPage <= 1}
              className={`flex items-center gap-2 px-5 py-2.5 ${
                currentPage <= 1
                  ? "bg-gray-800/50 text-gray-500"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              } rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20`}
            >
              <i className="bi bi-arrow-left"></i>
              <span>Previous</span>
            </Button>

            <Button
              onClick={nextBtn}
              disabled={currentPage >= totalPage}
              className={`flex items-center gap-2 px-5 py-2.5 ${
                currentPage >= totalPage
                  ? "bg-gray-800/50 text-gray-500"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              } rounded-xl transition-all duration-300 shadow-lg shadow-purple-900/20`}
            >
              <span>Next</span>
              <i className="bi bi-arrow-right"></i>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col gap-4 mb-6">
        <QuestionCard questions={questionByIdList?.questions} />

        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-gray-800/50 w-full flex-grow">
          <AnswerCard questions={questionByIdList?.questions} keyProp={currentPage} />
        </div>
        <SuggestionCard questions={questionByIdList?.questions} />
      </div>

      <div className="flex justify-between pb-2 mt-auto">
        <Button
          onClick={prevBtn}
          disabled={currentPage <= 1}
          className={`flex items-center gap-2 px-5 py-2.5 ${
            currentPage <= 1
              ? "bg-gray-800/50 text-gray-500"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          } rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20`}
        >
          <i className="bi bi-arrow-left"></i>
          <span>Previous</span>
        </Button>

        <Button
          onClick={nextBtn}
          disabled={currentPage >= totalPage}
          className={`flex items-center gap-2 px-5 py-2.5 ${
            currentPage >= totalPage
              ? "bg-gray-800/50 text-gray-500"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          } rounded-xl transition-all duration-300 shadow-lg shadow-purple-900/20`}
        >
          <span>Next</span>
          <i className="bi bi-arrow-right"></i>
        </Button>
      </div>
    </div>
  );
};

export default MainContent;
