import React from 'react';
import { ResponsiveBar  } from '@nivo/bar';

export default function TierMasteryDistribution(props) {

    const data = props.data;
    return (
        <div style={{ height: 'calc(292px)'}}>
            <ResponsiveBar 
            data={data}
            keys={[ "None", "3rd", "2nd", "1st", "Ace"]}
            indexBy="Tier"
            margin={{ top: 30, right: 100, bottom: 50, left: 50 }}
            padding={0.3}
            colors={[
                "rgb(97, 97, 97)",
                "rgb(115, 83, 53)",
                "rgb(145, 106, 44)",
                "rgb(194, 194, 194)",
                "rgb(235, 191, 47)",
            ]}

            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Tier',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Tanks',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            />
        </div>
    );
}
