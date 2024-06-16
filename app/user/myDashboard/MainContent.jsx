import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import SuggestionCard from "./SuggestionCard";
import { Breadcrumbs, Button, Progress, Typography } from "@material-tailwind/react";
import { selectContentList } from "@/redux/content/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionListThunkAction } from "@/redux/content/action";
import Link from "next/link";

const MainContent = ({ subCategoryData }) => {
  const dispatch = useDispatch();

  const { questions } = useSelector(selectContentList);

  const totalPage = questions?.totalPages || 0;
  const [currentPage, setCurrentPage] = useState(1);

  const { subCategoryId, categoryName, subCategoryName } = subCategoryData;

  useEffect(() => {
    const param = {
      page: currentPage,
      limit: 1
    };
    if (subCategoryId) {
      dispatch(fetchQuestionListThunkAction({ subCategoryId, param }));
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
            <QuestionCard questions={questions?.questions} />
            <div className="bg-[#fff] rounded-md">
              <AnswerCard questions={questions?.questions} keyProp={currentPage} />
              <div className="flex items-center justify-center w-full ">
                <Button variant="filled" color="blue">
                  Give Suggestion
                </Button>
              </div>
              <SuggestionCard />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pb-2">
        <Button onClick={prevBtn} disabled={currentPage <= 1} color="blue">
          {"< Previous"}
        </Button>
        <Button onClick={nextBtn} disabled={currentPage >= totalPage} color="blue">
          {"Next >"}
        </Button>
      </div>
    </>
  );
};

export default MainContent;
