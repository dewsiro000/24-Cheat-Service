import { logger } from "@/lib/winston";

/*Services*/
import calculateSolutions from "@/services/answerService";

/*Models*/
import User from "@/models/user";
import Answer from "@/models/answer";

/*Types*/
import type { Request, Response } from "express";

export const getAnswers = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  const nums = req.query["nums[]"];

  if (!nums || nums.length !== 4) {
    return res.status(400).json({ message: "You must provide 4 numbers." });
  }

  try {
    const numArray: number[] = (nums as string[]).map((num: string) => parseFloat(num));

    let answer = await Answer.findOne({ numbers: { $all: numArray } });

    if (answer) {
      logger.info('คำตอบที่ค้นหาจากฐานข้อมูล:');
      return res.json(answer);

    } else {
      logger.error('ไม่พบคำตอบในฐานข้อมูล'); 
      const solutions = calculateSolutions(numArray);
      answer = new Answer({ numbers: numArray, solutions });

      await answer.save();
      return res.json(answer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving answers." });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-__v").lean().exec();

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error: err,
    });
    logger.error("Error while getting current user", err);
  }
};
