import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { doctorDashBoard } from '../features/Doctor/doctorSlice';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12,
    },
    header: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#7371fc'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    rowItem: {
        flex: 1,
        marginRight: 10, // Similar to Tailwind's margin-right
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',

    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        padding: 5,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
    },
    tableCell: {
        padding: 5,
        border: '1px solid #ddd',
    },
});


function AppointmentPdf({ data, doctorData }) {
    return (
        // <Document>
        //     <Page style={styles.page}>
        //         <Text style={styles.header}>Appointment Details</Text>
        //         <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
        //             <Text style={{ flex: 1 }}>Patient Name: {data.patientName}</Text>
        //             <Text style={{ flex: 1 }}>Appointment Date: {data.appointmentDate}</Text>
        //         </View>
        //         <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
        //             <Text style={{ flex: 1 }}>Patient Email: {data.patientEmail}</Text>
        //             <Text style={{ flex: 1 }}>Status: {data.status}</Text>
        //         </View>
        //         <Text>Symptoms: {data.symptoms}</Text>
        //         <Text>Diagnosis: {data.diagnosis}</Text>
        //         <Text>Prescription: {data.prescription}</Text>
        //         <Text>Notes: {data.notes}</Text>

        //         {data.prescribedMedications?.length > 0 && (
        //             <>
        //                 <Text style={{ marginTop: 10 }}>Prescribed Medications:</Text>
        //                 <View style={styles.table}>
        //                     <View style={styles.tableHeader}>
        //                         <Text style={styles.tableHeaderCell}>Medication</Text>
        //                     </View>
        //                     {data.prescribedMedications.map((medication) => (
        //                         <View key={medication} style={styles.tableCell}>
        //                             <Text>{medication}</Text>
        //                         </View>
        //                     ))}
        //                 </View>
        //             </>
        //         )}

        //         {data.labTestRequests?.length > 0 && (
        //             <>
        //                 <Text style={{ marginTop: 10 }}>Lab Test Requests:</Text>
        //                 <View style={styles.table}>
        //                     <View style={styles.tableHeader}>
        //                         <Text style={styles.tableHeaderCell}>Test Name</Text>
        //                     </View>
        //                     {data.labTestRequests.map((test) => (
        //                         <View key={test} style={styles.tableCell}>
        //                             <Text>{test}</Text>
        //                         </View>
        //                     ))}
        //                 </View>
        //             </>
        //         )}

        //         <Text style={{ marginTop: 10 }}>Follow Up Date: {data.followUpDate}</Text>
        //         <Text>Follow Up Instructions: {data.followUpInstructions}</Text>
        //     </Page>

        // </Document>
        <Document>
            <Page style={styles.page}>
                <Text style={styles.header}>Health ARc</Text>
                <View style={styles.row}>
                    <Text style={styles.rowItem}>Doctor Name: {doctorData?.doctorInfo?.personalInfo?.firstName} {doctorData?.doctorInfo?.personalInfo?.lastName}</Text>
                    <Text style={styles.rowItem}>Email: {doctorData?.doctorInfo?.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowItem}>Patient Name: {data.patientName}</Text>
                    <Text style={styles.rowItem}>Patient Email: {data.patientEmail}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowItem}>Appointment : {data.status}</Text>
                    <Text style={styles.rowItem}>Date of Appointment : {data.appointmentDate}</Text>
                </View>

                <Text>Symptoms: {data.symptoms}</Text>
                <Text>Diagnosis: {data.diagnosis}</Text>
                <Text>Prescription: {data.prescription}</Text>
                <Text>Notes: {data.notes}</Text>

                {data.prescribedMedications.length > 0 && (
                    <>
                        <Text style={{ marginTop: 10 }}>Prescribed Medications:</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderCell}>Medication</Text>
                            </View>
                            {data.prescribedMedications.map((medication) => (
                                <View key={medication} style={styles.tableCell}>
                                    <Text>{medication}</Text>
                                </View>
                            ))}
                        </View>
                    </>
                )}

                {data.labTestRequests.length > 0 && (
                    <>
                        <Text style={{ marginTop: 10 }}>Lab Test Requests:</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderCell}>Test Name</Text>
                            </View>
                            {data.labTestRequests.map((test) => (
                                <View key={test} style={styles.tableCell}>
                                    <Text>{test}</Text>
                                </View>
                            ))}
                        </View>
                    </>
                )}

                <Text style={{ marginTop: 10 }}>Follow Up Date: {data.followUpDate}</Text>
                <Text>Follow Up Instructions: {data.followUpInstructions}</Text>
            </Page>
        </Document>
    )
}

export default AppointmentPdf
