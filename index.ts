import * as fs from 'fs';
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

interface Student {
    id: string;
    firstName: string;
    lastName: string;
    yearLevel: number;
}

interface Question {
    id: string;
    stem: string;
    type: string;
    strand: string;
    config: {
        options: Option[];
        key: string;
        hint: string;
    };
}

interface Option {
    id: string;
    label: string;
    value: string;
}

interface Assessment {
    id: string;
    name: string;
    questions: { questionId: string; position: number }[];
}

interface StudentResponse {
    id: string;
    assessmentId: string;
    assigned: string;
    started: string;
    completed?: string;
    student: {
        id: string;
        yearLevel: number;
    };
    responses: {
        questionId: string;
        response: string;
    }[];
    results: {
        rawScore: number;
    };
}


// Function to read and parse JSON files
function readData<T>(filename: string): T | null {
    try {
        const data = fs.readFileSync(`data/${filename}.json`, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
        return null; // Return null or handle the error as appropriate
    }
}


// Implementation for diagnostic report
function generateDiagnosticReport(studentId: string, questions: Question[], studentResponses: StudentResponse[], students: Student[]) {
    const student = students.find(s => s.id === studentId);
    if (!student) {
        console.log("Student not found.");
        return;
    }

    const latestResponse = studentResponses.filter(sr => sr.student.id === studentId && sr.completed)
        .sort((a, b) => new Date(b.completed!).getTime() - new Date(a.completed!).getTime())[0];

    if (!latestResponse) {
        console.log("No completed assessments found for this student.");
        return;
    }

    const responseDetails = latestResponse.responses.map(response => {
        const question = questions.find(q => q.id === response.questionId)!;
        const correct = question.config.key === response.response;
        return { ...response, correct, strand: question.strand };
    });

    const totalCorrect = responseDetails.filter(r => r.correct).length;
    const strands = [...new Set(questions.map(q => q.strand))];
    console.log(`${student.firstName} ${student.lastName} recently completed ${latestResponse.assessmentId} on ${latestResponse.completed}`);
    console.log(`He got ${totalCorrect} questions right out of ${responseDetails.length}. Details by strand given below:\n`);

    strands.forEach(strand => {
        const strandResponses = responseDetails.filter(r => r.strand === strand);
        const correctResponses = strandResponses.filter(r => r.correct).length;
        console.log(`${strand}: ${correctResponses} out of ${strandResponses.length} correct`);
    });
}



// Implementation for progress report
function generateProgressReport(studentId: string, studentResponses: StudentResponse[], students: Student[]) {
    const student = students.find(s => s.id === studentId);
    if (!student) {
        console.log("Student not found.");
        return;
    }

    const responses = studentResponses.filter(sr => sr.student.id === studentId && sr.completed);
    if (responses.length === 0) {
        console.log("No assessments found for this student.");
        return;
    }

    console.log(`${student.firstName} ${student.lastName} has completed ${responses[0].assessmentId} ${responses.length} times in total. Date and raw score given below:\n`);
    responses.forEach(response => {
        console.log(`Date: ${response.completed}, Raw Score: ${response.results.rawScore} out of ${response.responses.length}`);
    });

    const improvement = responses[responses.length - 1].results.rawScore - responses[0].results.rawScore;
    console.log(`\n${student.firstName} ${student.lastName} got ${improvement} more correct in the recent completed assessment than the oldest`);
}



// Implementation for feedback report
function generateFeedbackReport(studentId: string, questions: Question[], studentResponses: StudentResponse[], students: Student[]) {
    const student = students.find(s => s.id === studentId);
    if (!student) {
        console.log("Student not found.");
        return;
    }

    const latestResponse = studentResponses.filter(sr => sr.student.id === studentId && sr.completed)
        .sort((a, b) => new Date(b.completed!).getTime() - new Date(a.completed!).getTime())[0];

    if (!latestResponse) {
        console.log("No completed assessments found for this student.");
        return;
    }

    console.log(`${student.firstName} ${student.lastName} recently completed ${latestResponse.assessmentId} on ${latestResponse.completed}`);
    console.log(`He got ${latestResponse.results.rawScore} questions right out of ${latestResponse.responses.length}. Feedback for wrong answers given below\n`);

    latestResponse.responses.forEach(response => {
        const question = questions.find(q => q.id === response.questionId);
        if (question && question.config.key !== response.response) {
            const correctOption = question.config.options.find(option => option.id === question.config.key);
            const studentOption = question.config.options.find(option => option.id === response.response);

            console.log(`Question: ${question.stem}`);
            // Use optional chaining (?.) to safely access properties
            console.log(`Your answer: ${studentOption?.label || 'N/A'} with value ${studentOption?.value || 'N/A'}`);
            console.log(`Right answer: ${correctOption?.label || 'N/A'} with value ${correctOption?.value || 'N/A'}`);
            console.log(`Hint: ${question.config.hint}\n`);
        }
    });
}

async function main() {
    const students: Student[] | null = readData<Student[]>('students');
    const questions: Question[] | null = readData<Question[]>('questions');
    const assessments: Assessment[] | null = readData<Assessment[]>('assessments');
    const studentResponses: StudentResponse[] | null = readData<StudentResponse[]>('student-responses');

    if (!students || !questions || !assessments || !studentResponses) {
        console.error("Failed to load data. Please check the data files.");
        return;
    }

    const studentId = prompt('Please enter Student ID: ');
    const reportType = prompt('Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): ');
    console.log('\n');
    
    switch (reportType) {
        case '1':
            generateDiagnosticReport(studentId, questions, studentResponses, students);
            break;
        case '2':
            generateProgressReport(studentId, studentResponses, students);
            break;
        case '3':
            generateFeedbackReport(studentId, questions, studentResponses,students);
            break;
        default:
            console.log('Invalid report type selected.');
    }

    console.log('\n');
}

if (require.main === module) {
    main().catch(console.error);
}


export { generateDiagnosticReport, generateProgressReport, generateFeedbackReport };

