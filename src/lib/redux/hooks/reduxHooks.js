import { useDispatch, useSelector } from 'react-redux';

// Use these typed hooks instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
