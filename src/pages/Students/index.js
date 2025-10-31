import { Container } from '../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaPlusSquare,
} from 'react-icons/fa';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { StudentContainer, ProfilePicture, HeaderContainer } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';

import { deleteButtonColor } from '../../config/colors';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    async function getStudents() {
      try {
        setIsLoading(true);

        const response = await axios.get('/alunos');
        setStudents(response.data);

        setIsLoading(false);
      } catch (error) {
        toast.error('Error while loading students data');
        setIsLoading(false);
      }
    }

    getStudents();
  }, []);

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${studentToDelete.id}`);

      // Remove the deleted student from the state
      setStudents(
        students.filter((student) => student.id !== studentToDelete.id)
      );

      toast.success('Student deleted successfully');
    } catch (error) {
      toast.error('Error while deleting student');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStudentToDelete(null);
  };

  return (
    <Container>
      <Loading isLoading={isLoading}></Loading>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Student"
        message={`Would you like to delete "${studentToDelete?.nome}"? This action is irreversible.`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <HeaderContainer>
        <h1>Students</h1>

        <Link
          to="/student"
          className="add-student-link"
          title="Add new student"
        >
          <FaPlusSquare size={24} />
        </Link>
      </HeaderContainer>

      <StudentContainer>
        {students.map((student) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', false) ? (
                <img src={student.Photos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{student.nome}</span>

            <span>{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16}></FaEdit>
            </Link>

            <button
              onClick={() => handleDeleteClick(student)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: deleteButtonColor,
              }}
            >
              <FaWindowClose size={16}></FaWindowClose>
            </button>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
