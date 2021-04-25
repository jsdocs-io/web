export interface Sponsor {
    readonly name: string;
    readonly url: string;
    readonly logo: string;
}

export interface Backer {
    readonly name: string;
    readonly url?: string;
}

export const goldSponsors: Sponsor[] = [
    {
        name: 'Sponsor placeholder',
        url: '#gold-sponsors',
        logo: './sponsor-placeholder.png',
    },
    {
        name: 'Sponsor placeholder',
        url: '#gold-sponsors',
        logo: './sponsor-placeholder.png',
    },
    {
        name: 'Sponsor placeholder',
        url: '#gold-sponsors',
        logo: './sponsor-placeholder.png',
    },
];

export const silverSponsors: Sponsor[] = [
    {
        name: 'Sponsor placeholder',
        url: '#silver-sponsors',
        logo: './sponsor-placeholder.png',
    },
    {
        name: 'Sponsor placeholder',
        url: '#silver-sponsors',
        logo: './sponsor-placeholder.png',
    },
    {
        name: 'Sponsor placeholder',
        url: '#silver-sponsors',
        logo: './sponsor-placeholder.png',
    },
];

export const bronzeSponsors: Sponsor[] = [
    {
        name: 'Sponsor placeholder',
        url: '#bronze-sponsors',
        logo: './sponsor-placeholder.png',
    },
    {
        name: 'Sponsor placeholder',
        url: '#bronze-sponsors',
        logo: './sponsor-placeholder.png',
    },
    {
        name: 'Sponsor placeholder',
        url: '#bronze-sponsors',
        logo: './sponsor-placeholder.png',
    },
];

export const generousBackers: Backer[] = [
    { name: 'Your name here' },
    { name: 'Your name here' },
    { name: 'Your name here' },
].sort((a, b) => a.name.localeCompare(b.name));

export const backers: Backer[] = [
    { name: 'Your name here' },
    { name: 'Your name here' },
    { name: 'Your name here' },
].sort((a, b) => a.name.localeCompare(b.name));
