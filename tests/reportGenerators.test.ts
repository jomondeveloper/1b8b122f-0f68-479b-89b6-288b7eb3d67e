import { generateDiagnosticReport, generateProgressReport, generateFeedbackReport } from '../index';

// Mock data
const students = [{ id: "student1", firstName: "Tony", lastName: "Stark", yearLevel: 6 }];
// Mock question
const questions = [{
    id: "numeracy1",
    stem: "What is 2 + 2?",
    type: "multiple-choice",
    strand: "Number and Algebra",
    config: {
        options: [
            { id: "option1", label: "A", value: "3" },
            { id: "option2", label: "B", value: "4" }, // Correct answer
        ],
        key: "option2",
        hint: "Basic addition"
    }
}];
// Ensure there's at least one correct answer for the diagnostic report test
const studentResponses = [
    {
        id: "response1",
        assessmentId: "assessment1",
        assigned: "2021-12-14",
        started: "2021-12-16",
        completed: "2021-12-16",
        student: { id: "student1", yearLevel: 6 },
        responses: [{ questionId: "numeracy1", response: "option2" }], // Correct answer
        results: { rawScore: 1 }
    },
];


describe('Report Generation Tests', () => {
    it('should correctly generate a diagnostic report', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        generateDiagnosticReport("student1", questions, studentResponses, students);

        // Example expectation: check if the console logged the expected diagnostic report output
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Tony Stark recently completed assessment1 on"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("He got 1 questions right out of 1. Details by strand given below:"));

        // Always clean up after spying
        consoleSpy.mockRestore();
    });

});

describe('generateProgressReport Tests', () => {
    it('should correctly generate a progress report for multiple assessments', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        
        generateProgressReport("student1", studentResponses, students);

        // Check if the console logged progress information
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Tony Stark has completed assessment1"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Date: 2021-12-16, Raw Score: 1 out of 1"));

        consoleSpy.mockRestore(); // Always clean up after spying
    });
});

describe('generateFeedbackReport Tests', () => {
    it('should correctly generate feedback for wrong answers', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const modifiedStudentResponses = [{
            ...studentResponses[0],
            responses: [{ questionId: "numeracy1", response: "option1" }] // Assume option1 is wrong
        }];

  
        generateFeedbackReport("student1", questions, modifiedStudentResponses, students);

        // Check if the console logged feedback information
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Tony Stark recently completed assessment1"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Your answer: A with value 3"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Right answer: B with value 4"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hint:")); // Check for a hint presence

        consoleSpy.mockRestore(); // Always clean up after spying
    });
});



