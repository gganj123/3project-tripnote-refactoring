import React, { useEffect } from 'react';
import logo from '../../assets/logo-green.png';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import useAuthStore from '../../store/useAuthStore'; // Zustand authStore import
import Button from '../commons/Button';

export default function Header() {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // Zustand 상태 구독
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('accessToken:', token); // 콘솔 로그로 토큰 확인
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/agree');
  };

  const handleLogoutClick = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃 되었습니다.');

      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const handleSearchClick = () => {
    setSearchQuery('');
    navigate('/');

    const searchElement = document.getElementById('search');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white text-title py-10 px-20 border-b border-grey-300 fixed z-50 top-0 left-0 w-full">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center text-l">
          <img className="w-36 h-auto" src={logo} alt="trip note logo" />
        </Link>
        <nav className="flex items-center gap-4 font-medium">
          <Link
            onClick={handleSearchClick}
            className="hover:text-prime"
            to="/root/recommend"
          >
            경로 검색
          </Link>
          <Link className="hover:text-prime" to="/root/create">
            경로 생성
          </Link>
          <Link className="hover:text-prime" to="/board">
            후기
          </Link>
          {isLoggedIn ? (
            <>
              <Link className="hover:text-prime" to="/mypage">
                마이페이지
              </Link>
              <Button onClick={handleLogoutClick} className="border-grey-300">
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLoginClick}
                className="space-x-2 border-grey-300"
              >
                로그인
              </Button>
              <Button
                onClick={handleSignupClick}
                className="border-grey-300 bg-red-400 text-white"
              >
                회원가입
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
