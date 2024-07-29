import { Avatar, Card, Checkbox, CheckboxGroup, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react'
import { Buy, Flatrate, Rent, WatchLocale, WatchProviders } from 'tmdb-ts';

interface WatchProvidersProps {
    providers: WatchProviders;
}

interface ProviderCountry {
    countryCode: string,
    countryName: string,
    flag: string
}

export default function WatchProviders({ providers }: WatchProvidersProps) {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
    const DEFAULT_REGION = "GB"

    const [selectedCountry, setSelectedCountry] = useState<string>(DEFAULT_REGION);

    function getFlagEmoji(countryCode: string) {
        let codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    const countries: ProviderCountry[] = Object.keys(providers.results).map(p => {
        return {
            countryCode: p,
            countryName: regionNames.of(p) ?? "Unknown",
            flag: getFlagEmoji(p)
        }
    }).sort((a, b) => a.countryName.toLowerCase().localeCompare(b.countryName.toLowerCase()))

    const selectedProvider = providers.results[selectedCountry as keyof WatchLocale] as { link?: string; rent?: Rent[]; buy?: Buy[]; flatrate?: Flatrate[] };

    return (
        <Card>
            <Select
                className="max-w-xs"
                label="Country"
                placeholder="Select a country"
                onSelectionChange={(e) => {
                    setSelectedCountry(e.currentKey ?? DEFAULT_REGION)
                }}
            >
                {countries.map((p) => (
                    <SelectItem key={p.countryCode} startContent={p.flag}>{p.countryName}</SelectItem>
                ))}
            </Select>

            <RadioGroup
                orientation="horizontal"
                defaultValue={"stream"}
            >
                <Radio value="stream">Stream</Radio>
                <Radio value="buy">Buy</Radio>
                <Radio value="rent">Rent</Radio>
            </RadioGroup>
        </Card>
    )
}
