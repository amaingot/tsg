import { execSync } from 'child_process';
import { danger, markdown, message, warn } from 'danger';
import { fromJS, Map } from 'immutable';
import { generateMDTable, generateRow, SizeRecord } from './compareAssetSizes';

/**
 * Changed files list
 */
const modifiedMD = danger.git.modified_files.join('\n - ');
const addedMD = danger.git.created_files.join('\n - ');
const deletedMD = danger.git.deleted_files.join('\n - ');
let changeMessage = '';
if (danger.git.modified_files.length) {
  changeMessage += `### Changed Files in this PR: \n - ${modifiedMD}\n\n`;
}
if (danger.git.created_files.length) {
  changeMessage += `### Added Files in this PR: \n - ${addedMD}\n\n`;
}
if (danger.git.deleted_files.length) {
  changeMessage += `### Deleted Files in this PR: \n - ${deletedMD}\n\n`;
}
message(changeMessage);

/**
 * package.json changed but not package-lock.json
 */
const packageChanged = fromJS(danger.git.modified_files).contains('package.json');
const lockfileChanged = fromJS(danger.git.modified_files).contains('package-lock.json');
if (packageChanged && !lockfileChanged) {
  const packageJsonMessage = 'Changes were made to package.json, but not to package-lock.json';
  const packageJsonIdea = 'Perhaps you need to run `npm install`?';
  warn(`${packageJsonMessage} - <i>${packageJsonIdea}</i>`);
}

/**
 * Asset size comparison
 */
function getMasterAssetSizes(): Record<string, SizeRecord> {
  const circleToken = process.env.CIRCLE_API_TOKEN || '';
  const projectName = process.env.CIRCLE_PROJECT_REPONAME;
  const circleBaseUri = `https://circleci.com/api/v1.1/project/github/amaingot/${projectName}`;
  const circleTokenQuery = `circle-token=${circleToken}`;
  try {
    const getBuildsUri = `${circleBaseUri}/tree/master?${circleTokenQuery}`;
    const latestBuilds = fromJS(
      JSON.parse(execSync(`curl "${getBuildsUri}"`, { encoding: 'utf8' }))
    );

    // "test" is where the asset manifests are stored
    const lastMasterBuildNum: number = latestBuilds
      .find((build: Map<any, any>) => build.getIn(['build_parameters', 'CIRCLE_JOB']) === 'test')
      .get('build_num', 81);

    const getAssetsUri = `${circleBaseUri}/${lastMasterBuildNum}/artifacts?${circleTokenQuery}`;
    const assetsList = fromJS(JSON.parse(execSync(`curl "${getAssetsUri}"`, { encoding: 'utf8' })));
    const manifestObject: Map<string, string> = assetsList.find((asset: Map<string, string>) =>
      asset.get('path', '').includes('assetmanifest')
    );

    const masterManifest: Record<string, SizeRecord> = JSON.parse(
      execSync(`curl ${manifestObject.get('url')}?${circleTokenQuery}`, {
        encoding: 'utf8',
      })
    );

    return masterManifest;
  } catch (e) {
    const errorStr = `${e}`.replace(circleToken, '');
    warn(`Cannot access master branch bundle sizes, error returned: ${errorStr}`);
    return {};
  }
}

function assetSizes() {
  // this builds the typescript to javascript
  execSync('npm run bundle-sizes', {
    encoding: 'utf8',
  });

  const currentSizes: Map<string, SizeRecord> = Map(
    JSON.parse(
      execSync('node ./scripts/generateSizeManifest.js', {
        encoding: 'utf8',
      })
    )
  );
  const masterAssetSizes: Map<string, SizeRecord> = Map(getMasterAssetSizes());
  const unitjs: SizeRecord = masterAssetSizes.get('ares-unit.js', { compressed: 0, normal: 0 });
  const unitcss: SizeRecord = masterAssetSizes.get('ares-unit.css', { compressed: 0, normal: 0 });
  const microsite: SizeRecord = masterAssetSizes.get('ares-microsite.js', {
    compressed: 0,
    normal: 0,
  });
  const headers = ['Filename', 'Master', 'This Branch', 'Diff'];
  const files = [
    generateRow(
      'ares-unit.js',
      unitjs,
      currentSizes.get('ares-unit.js', { compressed: 0, normal: 0 })
    ),
    generateRow(
      'ares-unit.css',
      unitcss,
      currentSizes.get('ares-unit.css', { compressed: 0, normal: 0 })
    ),
    generateRow(
      'ares-microsite.js',
      microsite,
      currentSizes.get('ares-microsite.js', { compressed: 0, normal: 0 })
    ),
  ];
  markdown('# Asset Sizes \n' + generateMDTable(headers, files));
}

function runAssetSizes() {
  try {
    assetSizes();
  } catch (e) {
    warn('There was an error generating the assetSize report. Make sure master is green ;) \n' + e);
  }
}

function runEnvComment() {
  const env = process.env.CIRCLE_BRANCH;
  message(
    `## Demo Links\n` +
      `- Demo for this PR: http://demo.adforge.com/?example=auto&fenv=${env}&benv=staging&size=300x250&layout=1&show-data=0` +
      `\n- Auto Microsite for this PR: http://ares.global.ssl.fastly.net/origami_configs/auto/index.html?env=${env}`
  );
}

const tasks = [runEnvComment, runAssetSizes];

tasks.forEach(task => task());
