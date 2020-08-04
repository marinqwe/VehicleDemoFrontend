import React from 'react'
import { storesContext } from '../contexts/stores-context';

export const useStores = () => React.useContext(storesContext);