import React, { useState, useEffect } from 'react';
import './ToggleDevice.css';
import arrowImg from '../../../assets/icons/down-arrow.svg';

const ToggleDevice = ({currentDevice, devices, setCurrentDevice}) => {
  const [newDevice, setNewDevice] = useState({name: currentDevice.name, id: currentDevice.id});

  useEffect(() => {
    setCurrentDevice(newDevice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDevice]);

  return (
    <>
      <div className="toggle-device-box">
        <select className="device-selector" onChange={(e)=>setNewDevice({name: e.target[e.target.selectedIndex].value, id: e.target[e.target.selectedIndex].id})} value={newDevice.name}>
          {devices && devices.map((device, i) => {
            return (
              <option key={i} id={device.id} value={device.name}>{device.name}</option>
              )
            })}
        </select>
        <img className="arrow-img" src={arrowImg} alt="down-arrow"/>
      </div>
    </>
  )
};

export default ToggleDevice;
