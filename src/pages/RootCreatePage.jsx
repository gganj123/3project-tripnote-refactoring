import React, { useState } from 'react';
import RootCreate from '../components/root/RootCreate';
import BarRootCreate from '../components/root/BarRootCreate';
import useMapStore from '../store/useMapStore';
import NaverCreateMap from '../components/Map/NaverCreateMap';

export default function RootCreatePage() {
  const markers = useMapStore((state) => state.markers);

  return (
    <div className="mt-[118px] w-full bg-subTitle flex mx-auto">
      <div className="w-[360px] bg-white border-e-2">
        <div className="w-[360px] p-4 flex justify-between items-center">
          <RootCreate />
        </div>
      </div>
      <div className="w-[360px] bg-white">
        <BarRootCreate />
      </div>
      <NaverCreateMap markers={markers} className={'w-screen'} />
    </div>
  );
}
