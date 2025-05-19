import {Grid2} from "@mui/material";
import {AnalyticsWidgetSummary} from "./analytics-widget-summary.tsx";
import {AnalyticsCurrentVisits} from "./analytics-current-visits.tsx";
import {AnalyticsWebsiteVisits} from "./analytics-website-visits.tsx";
import {useState} from "react";
import {fetchGetReportsByYear} from "../../components/api";


export function Dashboard(props: any) {

    let reportNbDays: number = 0;
    let reportDays: number[] = Array.from({ length: 12 }, () => 0);
    let reportNbBilled: number = 0;
    let reportBilled: number[] = Array.from({ length: 12 }, () => 0);
    let reportNbTaxes: number = 0;
    let reportTaxes: number[] = Array.from({ length: 12 }, () => 0);
    let reportNbBalance: number = 0;
    let reportBalance: number[] = Array.from({ length: 12 }, () => 0);
    let reportNbTaxCustomer: number = 0;
    let reportNbTaxContract: number = 0;
    let reportNbVat: number = 0;
    let reportNbTaxCompany: number = 0;
    let reportOnlyTax: number[] = Array.from({ length: 12 }, () => 0);
    let reportWithTax: number[] = Array.from({ length: 12 }, () => 0);
    let reportWithoutTax: number[] = Array.from({ length: 12 }, () => 0);

    const [nbDays, setNbDays] = useState<number>(reportNbDays);
    const [days, setDays] = useState<number[]>(reportDays);
    const [nbBilled, setNbBilled] = useState<number>(reportNbBilled);
    const [billed, setBilled] = useState<number[]>(reportBilled);
    const [nbTaxes, setNbTaxes] = useState<number>(reportNbTaxes);
    const [taxes, setTaxes] = useState<number[]>(reportTaxes);
    const [nbBalance, setNbBalance] = useState<number>(reportNbBalance);
    const [balance, setBalance] = useState<number[]>(reportBalance);
    const [nbTaxCustomer, setNbTaxCustomer] = useState<number>(reportNbTaxCustomer);
    const [nbTaxContract, setNbTaxContract] = useState<number>(reportNbTaxContract);
    const [nbTaxCompany, setNbTaxCompany] = useState<number>(reportNbTaxCompany);
    const [onlyTax, setOnlyTax] = useState<number[]>(reportOnlyTax);
    const [withTax, setWithTax] = useState<number[]>(reportWithTax);
    const [withoutTax, setWithoutTax] = useState<number[]>(reportWithoutTax);
    const [nbVat, setNbVat] = useState<number>(reportNbVat);
    const [yearSelected, setYearSelected] = useState<number>(0);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    if(yearSelected != props.year) {

        fetchGetReportsByYear(props.year)
            .then(response => {
                setIsLoad(true);
                setYearSelected(props.year);

                response.forEach(report => {
                    reportNbDays = reportNbDays + report.calculated.total_day;
                    reportDays[report.billed_month-1] = report.calculated.total_day;

                    reportNbBilled = reportNbBilled + report.calculated.total_tax_excluded;
                    reportBilled[report.billed_month-1] = report.calculated.total_tax_excluded;

                    reportNbTaxes = reportNbTaxes + report.calculated.vat;
                    reportTaxes[report.billed_month-1] = report.calculated.vat;

                    reportNbBalance = reportNbBalance + report.calculated.balance;
                    reportBalance[report.billed_month-1] = report.calculated.balance;

                    reportNbTaxCustomer = reportNbTaxCustomer + report.calculated.total_tax_customer;
                    reportNbTaxContract = reportNbTaxContract + ((report.contract.daily_rate as any) - report.calculated.contract_tax_excluded);
                    reportNbVat = reportNbVat + report.calculated.vat;
                    reportNbTaxCompany = reportNbTaxCompany + report.calculated.total_tax_company;

                    reportOnlyTax[report.billed_month-1] = report.calculated.vat;
                    reportWithTax[report.billed_month-1] = report.calculated.total_tax_included;
                    reportWithoutTax[report.billed_month-1] = report.calculated.total_tax_excluded;
                });

                setNbDays(reportNbDays);
                setDays(reportDays);
                setNbBilled(reportNbBilled);
                setBilled(reportBilled);
                setNbTaxes(reportNbTaxes);
                setTaxes(reportTaxes);
                setNbBalance(reportNbBalance);
                setBalance(reportBalance);
                setNbTaxCustomer(reportNbTaxCustomer);
                setNbTaxContract(reportNbTaxContract);
                setNbVat(reportNbVat);
                setNbTaxCompany(reportNbTaxCompany);
                setOnlyTax(reportOnlyTax);
                setWithTax(reportWithTax);
                setWithoutTax(reportWithoutTax);
            });
    }

    return (<>
        {isLoad && <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, sm: 6, md: 3}}>
            <AnalyticsWidgetSummary
                title="Days"
                percent={0}
                total={nbDays}
                icon={<img alt="icon" src="/assets/icons/glass/schedule.png" />}
                chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: days,
                }}
            />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 3}}>
            <AnalyticsWidgetSummary
                title="Billed tax excuded"
                percent={0}
                total={nbBilled}
                color="secondary"
                icon={<img alt="icon" src="/assets/icons/glass/bill.png" />}
                chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: billed,
                }}
            />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 3}}>
            <AnalyticsWidgetSummary
                title="Taxes"
                percent={0}
                total={nbTaxes}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/taxes.png" />}
                chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: taxes,
                }}
            />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 3}}>
            <AnalyticsWidgetSummary
                title="Balance"
                percent={0}
                total={nbBalance}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/balance.png" />}
                chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: balance,
                }}
            />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4}}>
            <AnalyticsCurrentVisits
                title="Taxes"
                chart={{
                    series: [
                        { label: 'Contract', value: nbTaxContract },
                        { label: 'Vat', value: nbVat },
                        { label: 'Company', value: nbTaxCompany },
                        { label: 'Customer', value: nbTaxCustomer },
                        { label: 'Remaining', value: nbBalance },
                    ],
                }}
            />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 8}}>
            <AnalyticsWebsiteVisits
                title="Report"
                subheader="for year: 2025"
                chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: [
                        { name: 'Only tax', data: onlyTax },
                        { name: 'With tax', data: withTax },
                        { name: 'Without tax', data: withoutTax },
                    ],
                }}
            />
        </Grid2>
    </Grid2>}
    </>);
}