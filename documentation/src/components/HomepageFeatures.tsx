import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Customizable',
    image: 'img/gears.svg',
    description: (
      <>
        <Translate description={'Home page customizable description'}>Our goal is simple: reduce your pain while maintained a repository by providing as much features as necessary!</Translate>
      </>
    ),
  },
  {
    title: 'Well documented',
    image: 'img/web.svg',
    description: (
      <>
        <Translate description={'Home page well documented description'}>This stale action contains a detailed documentation and a blog to help you get the best out of it!</Translate>
      </>
    ),
  },
  {
    title: 'Maintained',
    image: 'img/available-updates.svg',
    description: (
      <>
        <Translate description={'Home page maintained description'}>We are always here to help you get through the configuration and we are always keen to bring more features!</Translate>
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
