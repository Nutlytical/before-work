import { Injectable } from '@nestjs/common';
import { students } from '../db';
import { v4 as uuid } from 'uuid';
import {
  CreateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
  UpdateStudentDto,
} from './dto/student.dto';

@Injectable()
export class StudentService {
  private students = students;

  getStudents(): FindStudentResponseDto[] {
    return this.students;
  }

  getStudentById(studentId: string): FindStudentResponseDto {
    return this.students.find((student) => student.id === studentId);
  }

  createStudent(payload: CreateStudentDto): CreateStudentDto {
    let newStudent = {
      ...payload,
      id: uuid(),
    };

    this.students.push(newStudent);

    return newStudent;
  }

  updateStudent(
    studentId: string,
    payload: UpdateStudentDto,
  ): UpdateStudentDto {
    let updateStudent: StudentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updateStudent = { ...payload, id: studentId };

        return updateStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updateStudent;
  }

  getStudentsByTeacherId(teacherId: string): FindStudentResponseDto[] {
    return this.students.filter((student) => student.teacher === teacherId);
  }

  updateStudentTeacher(
    teacherId: string,
    studentId: string,
  ): StudentResponseDto {
    let updateStudent: StudentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updateStudent = { ...student, teacher: teacherId };

        return updateStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updateStudent;
  }
}
