import {
  cmdImport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear
} from './../consts';

export default (editor, config) => {
  const pn = editor.Panels;
  const eConfig = editor.getConfig();
  const crc = 'create-comp';
  const mvc = 'move-comp';
  const swv = 'sw-visibility';
  const expt = 'export-template';
  const osm = 'open-sm';
  const otm = 'open-tm';
  const ola = 'open-layers';
  const obl = 'open-blocks';
  const ful = 'fullscreen';
  const prv = 'preview';

  eConfig.showDevices = 0;

  pn.getPanels().reset([{
    id: 'commands',
    buttons: [{}],
  },{
    id: 'options',
    buttons: [{
      id: swv,
      command: swv,
      context: swv,
      className: 'fa fa-square-o',
    },{
      id: prv,
      context: prv,
      command: e => e.runCommand(prv),
      className: 'fa fa-eye',
    },{
      id: ful,
      command: ful,
      context: ful,
      className: 'fa fa-arrows-alt',
    },{
      id: 'undo',
      className: 'fa fa-undo',
      command: e => e.runCommand('core:undo'),
    },{
      id: 'redo',
      className: 'fa fa-repeat',
      command: e => e.runCommand('core:redo'),
    },{
      id: cmdImport,
      className: 'fa fa-download',
      command: e => e.runCommand(cmdImport),
    },{
      id: expt,
      className: 'fa fa-upload',
      command: e => e.runCommand(expt),
    },{
      id: cmdClear,
      className: 'fa fa-trash',
      command: e => e.runCommand(cmdClear),
    }],
  },{
    id: 'views',
    buttons  : [{
      id: osm,
      command: osm,
      className: 'fa fa-paint-brush',
    },{
      id: otm,
      command: otm,
      className: 'fa fa-cog',
    },{
      id: ola,
      command: ola,
      className: 'fa fa-database',
    },{
      id: obl,
      active: true,
      command: obl,
      className: 'fa fa-th-large',
    }],
  }]);

  // Add devices buttons
  const panelDevices = pn.addPanel({id: 'devices-c'});
  panelDevices.get('buttons').add([{
    id: cmdDeviceDesktop,
    command: cmdDeviceDesktop,
    className: 'fa fa-desktop',
    active: 1,
  },{
    id: cmdDeviceTablet,
    command: cmdDeviceTablet,
    className: 'fa fa-tablet',
  },{
    id: cmdDeviceMobile,
    command: cmdDeviceMobile,
    className: 'fa fa-mobile',
  }]);

  // On component change show the Style Manager
  config.showStylesOnChange && editor.on('component:selected', () => {
    const openLayersBtn = pn.getButton('views', ola);

    // Don't switch when the Layer Manager is on or
    // there is no selected component
    if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
      const openSmBtn = pn.getButton('views', osm);
      openSmBtn && openSmBtn.set('active', 1);
    }
  });
}
